' import '../serialization/toByteArray.brs'

function HttpServer() as object
  return {
    routes: {},
    addRoute: HttpServer_addRoute,
    listen: HttpServer_listen
  }
end function

sub HttpServer_addRoute(method as string, path as string, handler as object)
  m.routes[method + "|" + path] = handler
end sub

sub HttpServer_listen(portNumber)
  port = createObject("roMessagePort")

  addr = createObject("roSocketAddress")
  addr.setPort(portNumber)

  tcp = createObject("roStreamSocket")
  tcp.setMessagePort(port)
  tcp.notifyReadable(true)
  tcp.setAddress(addr)
  tcp.listen(4)

  tcpId = Stri(tcp.getID())

  if not tcp.eOK()
    print "Could not create TCP socket"
    stop
  end if

  sessions = {}
  connections = {}
  bufferIndex = 0
  bufferSize = 0
  buffer = createObject("roByteArray")


  '
  ' Wait for incoming connection
  '
  ' Result:
  '   * event
  '

  WAIT_FOR_CONNECTION:
  event = wait(0, port)

  if type(event) <> "roSocketEvent"
    goto WAIT_FOR_CONNECTION
  end if


  '
  ' Establish connection
  '
  ' Result:
  '   * connectionId
  '   * connection
  '

  connectionId = Stri(event.getSocketID())

  if connectionId = tcpId and tcp.isReadable()
    connection = tcp.accept()

    if connection <> invalid
      connection.notifyReadable(true)
      connection.setMessagePort(port)

      connectionId = Stri(connection.getID())
      connections[connectionId] = connection
    end if

    goto WAIT_FOR_CONNECTION
  end if

  connection = connections[connectionId]


  '
  ' Attach/Detach session
  '
  ' Result:
  '   * session
  '   * request
  '   * response
  '   * context
  '   * bufferIndex
  '   * bufferSize
  '   * buffer
  '

  bufferSize = connection.getCountRcvBuf()

  if bufferSize = 0
    connection.close()
    sessions.delete(connectionId)
    connections.delete(connectionId)

    goto WAIT_FOR_CONNECTION
  end if

  session = sessions[connectionId]

  if session = invalid
    session = {
      request: {
        search: {},
        headers: {
          "Content-Length": "0"
        },
        body: createObject("roByteArray")
      },
      response: {
        headers: {
          "Content-Type": "application/json"
        }
      },
      context: {
        state: 0,
        bufferSize: 0,
        buffer: createObject("roByteArray")
      }
    }

    sessions[connectionId] = session
  end if

  request = session.request
  response = session.response
  context = session.context

  bufferIndex = 0
  buffer[bufferSize - 1] = 0
  bufferSize = connection.receive(buffer, 0, bufferSize)


  '
  ' Extract method
  '
  ' Result:
  '   * request.method
  '

  if context.state = 0
    while bufferIndex < bufferSize
      code = buffer[bufferIndex]
      bufferIndex = bufferIndex + 1

      if code = 32
        context.state = 1
        request.method = context.buffer.toAsciiString()
        context.buffer.clear()
        goto HTTP_PATH
      end if

      context.buffer.push(code)
    end while

    goto WAIT_FOR_CONNECTION
  end if


  '
  ' Extract path
  '
  ' Result:
  '   * request.path
  '

  if context.state = 1
    HTTP_PATH:

    while bufferIndex < bufferSize
      code = buffer[bufferIndex]
      bufferIndex = bufferIndex + 1

      if code = 63
        context.state = 2
        request.path = context.buffer.toAsciiString()
        context.buffer.clear()
        goto HTTP_QUERY_STRING_NAME
      else if code = 32
        context.state = 4
        request.path = context.buffer.toAsciiString()
        context.buffer.clear()
        goto HTTP_VERSION
      end if

      context.buffer.push(code)
    end while

    goto WAIT_FOR_CONNECTION
  end if


  '
  ' Extract search params
  '
  ' Result:
  '   * request.search[<key>] = <value>
  '

  if context.state = 2
    HTTP_QUERY_STRING_NAME:

    while bufferIndex < bufferSize
      code = buffer[bufferIndex]
      bufferIndex = bufferIndex + 1

      if code = 32
        context.state = 4
        request.search[context.buffer.toAsciiString().decodeUriComponent()] = ""
        context.buffer.clear()
        goto HTTP_VERSION
      else if code = 38
        request.search[context.buffer.toAsciiString().decodeUriComponent()] = ""
        context.buffer.clear()
        goto HTTP_QUERY_STRING_NAME
      else if code = 61
        context.state = 3
        context.name = context.buffer.toAsciiString().decodeUriComponent()
        context.buffer.clear()
        goto HTTP_QUERY_STRING_VALUE
      end if

      context.buffer.push(code)
    end while

    goto WAIT_FOR_CONNECTION
  end if

  if context.state = 3
    HTTP_QUERY_STRING_VALUE:

    while bufferIndex < bufferSize
      code = buffer[bufferIndex]
      bufferIndex = bufferIndex + 1

      if code = 32
        context.state = 4
        request.search[context.name] = context.buffer.toAsciiString().decodeUriComponent()
        context.buffer.clear()
        goto HTTP_VERSION
      else if code = 38
        context.state = 2
        request.search[context.name] = context.buffer.toAsciiString().decodeUriComponent()
        context.buffer.clear()
        goto HTTP_QUERY_STRING_NAME
      end if

      context.buffer.push(code)
    end while

    goto WAIT_FOR_CONNECTION
  end if


  '
  ' Skip version
  '

  if context.state = 4
    HTTP_VERSION:

    while bufferIndex < bufferSize
      code = buffer[bufferIndex]
      bufferIndex = bufferIndex + 1

      if code = 10
        context.state = 5
        goto HTTP_HEADER_NAME
      end if
    end while

    goto WAIT_FOR_CONNECTION
  end if


  '
  ' Extract headers
  '
  ' Result:
  '   * request.headers[<key>] = <value>
  '

  if context.state = 5
    HTTP_HEADER_NAME:

    while bufferIndex < bufferSize
      code = buffer[bufferIndex]
      bufferIndex = bufferIndex + 1

      if code = 13
        goto HTTP_HEADER_NAME
      else if code = 10
        request.headers["Content-Length"] = val(request.headers["Content-Length"])
        context.state = 7
        goto HTTP_BODY
      else if code = 58
        context.state = 6
        context.name = context.buffer.toAsciiString()
        context.buffer.clear()
        goto HTTP_HEADER_VALUE
      end if

      context.buffer.push(code)
    end while

    goto WAIT_FOR_CONNECTION
  end if

  if context.state = 6
    HTTP_HEADER_VALUE:

    while bufferIndex < bufferSize
      code = buffer[bufferIndex]
      bufferIndex = bufferIndex + 1

      if code = 13
        goto HTTP_HEADER_VALUE
      else if code = 10
        context.state = 5
        request.headers[context.name] = context.buffer.toAsciiString()
        context.buffer.clear()
        goto HTTP_HEADER_NAME
      end if

      if code = 32 and context.buffer.count() = 0
        goto HTTP_HEADER_VALUE
      end if

      context.buffer.push(code)
    end while

    goto WAIT_FOR_CONNECTION
  end if


  '
  ' Extract body
  '
  ' Result:
  '   * request.body
  '

  if context.state = 7
    HTTP_BODY:

    while bufferIndex < bufferSize
      request.body.push(buffer[bufferIndex])
      bufferIndex = bufferIndex + 1
    end while

    if request.body.count() < request.headers["Content-Length"]
      goto WAIT_FOR_CONNECTION
    end if

    sessions.delete(connectionId)

    if request.headers["Content-Type"] <> invalid and request.headers["Content-Type"].instr("json")
      request.body = parseJSON(request.body.toAsciiString())
    else
      request.body = request.body.toAsciiString()
    end if
  end if


  '
  ' Process request
  '
  ' Result:
  '   * response.code
  '   * response.body
  '   * response.headers
  '

  try
    handler = m.routes[request.method + "|" + request.path]
    if handler = invalid
      response.code = 501
    else
      body = handler(request, response)

      if response.body = invalid
        response.body = body
      end if

      if response.code = invalid
        if response.body = invalid
          response.code = 204
        else
          response.code = 200
        end if
      end if
    end if
  catch error
    response.code = 500
    response.body = error
  end try


  '
  ' Reply to request
  '

  if response.body = invalid
    response.body = ""
  end if

  response.body = toByteArray(response.body)
  size = response.body.count()

  crlf = chr(13) + chr(10)
  packet = "HTTP/1.1 " + response.code.toStr() + crlf
  for each header in response.headers.items()
    packet = packet + header.key + ": " + header.value + crlf
  end for
  packet = packet + "Content-Length: " + size.toStr() + crlf + crlf

  packetStream = createObject("roByteArray")
  packetStream.fromAsciiString(packet)
  packetStream.append(response.body)

  index = 0
  size = packetStream.count()
  while connection.status() = 0 and index < size
    while connection.getCountSendBuf() <> 0
    end while

    index = index + connection.send(packetStream, index, size - index)
  end while


  '
  ' Close connection
  '

  if request.headers["Connection"] = invalid or request.headers["Connection"] = "close"
    connection.close()
    connections.delete(connectionId)
  end if

  goto WAIT_FOR_CONNECTION
end sub


' @Route('GET', '/file')
sub onGetFile(request as object, response as object)
  byteArray = createObject("roByteArray")
  readed = byteArray.readFile(request.search.path)

  if not readed
    response.code = 404
    response.body = { message: "failed to read file, make sure the path is correct" }
    return
  end if

  path = CreateObject("roPath", request.search.path).split()
  response.headers["Content-Type"] = "application/octet-stream"
  response.headers["Content-Disposition"] = "attachment; filename=""" + path.filename + """"
  response.body = byteArray
end sub

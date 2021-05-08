' import './toString.brs'

function toByteArray(source as object) as object
  if getInterface(source, "ifByteArray") <> invalid
    return source
  end if

  byteArray = createObject("roByteArray")
  byteArray.fromAsciiString(toString(source))

  return byteArray
end function

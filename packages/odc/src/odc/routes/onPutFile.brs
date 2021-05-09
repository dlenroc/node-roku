' import '../helpers/fs/createDirectoryNested.brs'
' import '../helpers/serialization/toByteArray.brs'

' @Route('PUT', '/file')
sub onPutFile(request as object, response as object)
  file = request.search.path
  folder = CreateObject("roPath", file).split().parent

  folderExists = createDirectoryNested(folder)
  if not folderExists
    response.code = 400
    response.body = { message: "path is invalid or not writable" }
    return
  end if

  fileWrited = toByteArray(request.body).writeFile(file)
  if not fileWrited
    response.code = 400
    response.body = { message: "failed to write, possible file path is not writable" }
    return
  end if
end sub

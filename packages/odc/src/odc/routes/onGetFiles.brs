' import '../helpers/fs/getFiles.brs'

' @Route('GET', '/files')
function onGetFiles(request as object, response as object) as object
  return getFiles(request.search.path)
end function

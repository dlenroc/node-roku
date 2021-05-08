' import '../helpers/registry/getRegistry.brs'

' @Route('GET', '/registry')
function onGetRegistry(request as object, response as object) as object
  return getRegistry()
end function

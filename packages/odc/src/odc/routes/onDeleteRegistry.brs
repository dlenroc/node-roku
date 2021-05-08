' import '../helpers/registry/clearRegistry.brs'

' @Route('DELETE', '/registry')
sub onDeleteRegistry(request as object, response as object)
  clearRegistry()
end sub

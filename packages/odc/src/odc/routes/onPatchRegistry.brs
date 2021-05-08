' import '../helpers/registry/patchRegistry.brs'

' @Route('PATCH', '/registry')
sub onPatchRegistry(request as object, response as object)
  patchRegistry(request.body)
end sub

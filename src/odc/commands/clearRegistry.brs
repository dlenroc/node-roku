
' @Route('DELETE', '/registry')
function clearRegistry(request, response)
  registry = createObject("roRegistry")
  for each name in registry.getSectionList()
    registry.delete(name)
  end for
  registry.flush()
end function

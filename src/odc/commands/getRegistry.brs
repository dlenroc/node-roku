
' @Route('GET', '/registry')
function getRegistry(request, response)
  sections = {}

  registry = createObject("roRegistry")
  for each name in registry.getSectionList()
    sections[name] = {}
    section = createObject("roRegistrySection", name)
    for each key in section.getKeyList()
      sections[name][key] = section.read(key)
    end for
  end for

  return sections
end function

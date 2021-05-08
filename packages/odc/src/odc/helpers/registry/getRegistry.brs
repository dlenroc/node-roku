
function getRegistry() as object
  sections = {}

  registry = createObject("roRegistry")
  for each name in registry.getSectionList()
    section = createObject("roRegistrySection", name)
    sections[name] = section.readMulti(section.getKeyList())
  end for

  return sections
end function

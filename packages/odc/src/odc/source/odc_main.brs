
sub odc_main(options as Object)
  registry = CreateObject("roRegistry")

  if options.odc_clear_registry = "true"
    for each section in registry.GetSectionList()
      registry.delete(section)
    end for
  end if

  if options.odc_registry <> invalid then
    changes = parseJson(options.odc_registry)
    for each item in changes.items()
      if item.value = invalid then
        registry.delete(item.key)
      else
        section = createObject("roRegistrySection", item.key)

        for each item in item.value.items()
          if item.value = invalid then
            section.delete(item.key)
          else
            section.write(item.key, item.value)
          end if
        end for

        section.flush()
      end if
    end for
  end if

  registry.flush()
end sub

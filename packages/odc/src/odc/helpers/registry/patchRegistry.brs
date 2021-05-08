' import '../serialization/toString.brs'

sub patchRegistry(state as object)
  registry = createObject("roRegistry")

  for each item in state.items()
    if item.value = invalid
      registry.delete(item.key)
    else
      section = createObject("roRegistrySection", item.key)

      for each item in item.value.items()
        if item.value = invalid
          section.delete(item.key)
        else
          section.write(item.key, toString(item.value))
        end if
      end for

      section.flush()
    end if
  end for

  registry.flush()
end sub

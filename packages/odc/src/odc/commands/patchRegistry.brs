
' @Route('PATCH', '/registry')
function patchRegistry(request, response)
  registry = createObject("roRegistry")

  for each item in request.body.items()
    if item.value = invalid then
      registry.delete(item.key)
    else
      section = createObject("roRegistrySection", item.key)

      for each item in item.value.items()
        if item.value = invalid then
          section.delete(item.key)
        else
          section.write(item.key, toString(item.value))
        end if
      end for

      section.flush()
    end if
  end for

  registry.flush()
end function

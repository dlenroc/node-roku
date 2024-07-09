
function toSerializable(source as object) as object
  if getInterface(source, "ifToStr") <> invalid
    return source
  end if

  if getInterface(source, "ifArray") <> invalid
    results = []

    for index = 0 to source.count() - 1
      results.push(toSerializable(source[index]))
    end for

    return results
  end if

  if getInterface(source, "ifAssociativeArray") <> invalid
    result = {}

    if source.ifAssociativeArray = invalid
      items = source.ifAssociativeArray.items()
    else if source.items = invalid
      items = source.items()
    else
      items = []
    end if

    for each item in items
      value = item.value

      if getInterface(value, "ifSGNodeField") <> invalid
        value = value.getField("id")
      end if

      result[item.key] = toSerializable(value)
    end for

    return result
  end if

  return invalid
end function

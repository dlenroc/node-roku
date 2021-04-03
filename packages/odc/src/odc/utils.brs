function toString(source as object) as string
  if getInterface(source, "ifToStr") <> invalid
    return source.toStr()
  end if

  return formatJSON(source, 1)
end function

function toByteArray(source as object) as object
  byteArray = createObject("roByteArray")
  byteArray.fromAsciiString(toString(source))

  return byteArray
end function

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

    for each item in source.items()
      if getInterface(item.value, "ifSGNodeChildren") = invalid
        result[item.key] = toSerializable(item.value)
      end if
    end for

    return result
  end if

  return invalid
end function

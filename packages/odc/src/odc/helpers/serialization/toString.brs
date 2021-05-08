
function toString(source as object) as string
  if getInterface(source, "ifToStr") <> invalid
    return source.toStr()
  end if

  return formatJSON(source, 1)
end function

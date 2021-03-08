function odc_get_source() as object
  scene = m.top.GetScene()
  target = CreateObject("roXMLElement")
  target.setName("screen")
  odc_renderAppUI(target.addElement(scene.subtype()), scene)
  return target.genXML(false)
end function

function odc_renderAppUI(target as object, node as object)
  for each attribute in node.Items()
    if getInterface(attribute.value, "ifToStr") <> invalid then
      value = attribute.value
      if value <> invalid then
        value = box(value).toStr()
        if value <> "" then
          target.addAttribute(attribute.key, value)
        end if
      end if
    end if
  end for

  rect = node.sceneBoundingRect()
  if rect.width <> 0 and rect.height <> 0 then
    target.addAttribute("bounds", "[" + strI(rect.x).trim() + "," + strI(rect.y) + "," + strI(rect.width) + "," + strI(rect.height) + "]")
  end if

  isFocused = node.hasFocus()
  if isFocused then
    target.addAttribute("focused", node.hasFocus().toStr())
  end if

  for each nested in node.getChildren(-1, 0)
    if not nested.isSubtype("AnimationBase") then
      odc_renderAppUI(target.AddElement(nested.subtype()), nested)
    end if
  end for
end function

function odc_get_node(path as string) as object
  node = m.top.getScene()
  indexChain = parseJSON("[" + path + "]")

  for each index in indexChain
    found = false
    candidateIndex = -1

    for each candidate in node.getChildren(-1, 0)
      if not candidate.isSubtype("AnimationBase") then
        candidateIndex = candidateIndex + 1

        if candidateIndex = index then
          found = true
          node = candidate
          exit for
        end if
      end if
    end for

    if found = false then
      return invalid
    end if
  end for

  fields = odc_to_serializable(node)
  fields.delete("change")

  return {
    "type": node.subType(),
    "rect": node.sceneBoundingRect(),
    "hasFocus": node.hasFocus(),
    "isInFocusChain": node.isInFocusChain(),
    "fields": fields
  }
end function

function odc_to_string(source)
  if getInterface(source, "ifToStr") <> invalid then
    return source.toStr()
  end if

  return formatJSON(source, 1)
end function

function odc_to_serializable(source)
  if getInterface(source, "ifToStr") <> invalid then
    return source
  end if

  if getInterface(source, "ifArray") <> invalid then
    results = []

    for index = 0 to source.count() - 1
      results.push(odc_to_string(source[index]))
    end for

    return results
  end if

  if getInterface(source, "ifAssociativeArray") <> invalid then
    result = {}

    for each item in source.items()
      if getInterface(item.value, "ifSGNodeChildren") = invalid then
        result[item.key] = odc_to_string(item.value)
      end if
    end for

    return result
  end if

  return invalid
end function

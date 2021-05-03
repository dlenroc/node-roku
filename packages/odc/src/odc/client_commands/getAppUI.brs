function odc_get_source() as object
  scene = m.top.GetScene()
  target = CreateObject("roXMLElement")
  target.setName("screen")
  odc_renderAppUI(target.addElement(scene.subtype()), scene)
  return target.genXML(false)
end function

function odc_renderAppUI(target as object, node as object)
  for each field in node.items()
    fieldKey = field.key
    if fieldKey <> "change" and fieldKey <> "clippingRect" then
      odc_addFieldToNode(target, node, fieldKey, field.value)
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

  if getInterface(node.dialog, "ifSGNodeChildren") <> invalid then
    odc_renderAppUI(target.addElement(node.dialog.subtype()), node.dialog)
  end if

  for each nested in node.getChildren(-1, 0)
    odc_renderAppUI(target.addElement(nested.subtype()), nested)
  end for
end function

function odc_addFieldToNode(target as object, node as object, fieldKey as string, fieldValue as object)
  if getInterface(fieldValue, "ifSGNodeField") <> invalid then
    fieldValue = fieldValue.getField("id")
  end if

  fieldValue = odc_to_serializable(fieldValue)
  if fieldValue <> invalid then
    fieldType = node.getFieldType(fieldKey)
    if fieldType = "color" then
      fieldValue = "#" + StrI(fieldValue, 16)
    end if

    target.addAttribute(fieldKey, odc_to_string(fieldValue))
  end if
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

function odc_to_string(source as object)
  if getInterface(source, "ifToStr") <> invalid then
    return source.toStr()
  end if

  return formatJSON(source, 1)
end function

function odc_to_serializable(source as object)
  if getInterface(source, "ifToStr") <> invalid then
    return source
  end if

  if getInterface(source, "ifArray") <> invalid then
    results = []

    for index = 0 to source.count() - 1
      results.push(odc_to_serializable(source[index]))
    end for

    return results
  end if

  if getInterface(source, "ifAssociativeArray") <> invalid then
    result = {}

    for each item in source.items()
      value = item.value
      if getInterface(value, "ifSGNodeField") <> invalid then
        value = value.getField("id")
      end if

      result[item.key] = odc_to_serializable(value)
    end for

    return result
  end if

  return invalid
end function

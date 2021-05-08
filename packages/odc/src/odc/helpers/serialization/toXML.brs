' import './toSerializable.brs'
' import './toString.brs'

function toXML(source as object, fields = invalid as object) as string
  xml = createObject("roXMLElement")
  xml.setName("xml")

  scope = {
    fields: fields,
    render: sub(target as object, node as object)
      target = target.addElement(node.subtype())

      if m.fields = invalid
        for each field in node.items()
          m.addField(target, node, field.key, field.value)
        end for
      else
        fields = m.fields["*"]
        if fields <> invalid then
          for each field in fields
            if node.doesExist(field) then
              m.addField(target, node, field, node.getField(field))
            end if
          end for
        end if

        fields = m.fields[node.subtype()]
        if fields <> invalid then
          for each field in fields
            if node.doesExist(field) then
              m.addField(target, node, field, node.getField(field))
            end if
          end for
        end if
      end if

      rect = node.sceneBoundingRect()
      if rect.width <> 0 and rect.height <> 0 then
        target.addAttribute("bounds", "[" + strI(rect.x).trim() + "," + strI(rect.y) + "," + strI(rect.width) + "," + strI(rect.height) + "]")
      end if

      isFocused = node.hasFocus()
      if isFocused then
        target.addAttribute("focused", node.hasFocus().toStr())
      end if

      if getInterface(node.dialog, "ifSGNodeChildren") <> invalid then
        m.render(target, node.dialog)
      end if

      for each nested in node.getChildren(-1, 0)
        m.render(target, nested)
      end for
    end sub,
    addField: sub(target as object, node as object, fieldKey as string, fieldValue as object)
      if getInterface(fieldValue, "ifSGNodeField") <> invalid
        fieldValue = fieldValue.getField("id")
      end if

      fieldValue = toSerializable(fieldValue)
      if fieldValue <> invalid
        fieldType = node.getFieldType(fieldKey)
        if fieldType = "color"
          fieldValue = "#" + StrI(fieldValue, 16)
        end if

        target.addAttribute(fieldKey, toString(fieldValue))
      end if
    end sub
  }

  scope.render(xml, source)

  return xml.genXML(false)
end function

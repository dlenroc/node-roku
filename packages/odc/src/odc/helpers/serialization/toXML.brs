' import './toSerializable.brs'
' import './toString.brs'

function toXML(source as object, fields = invalid as object) as string
  xml = createObject("roXMLElement")
  xml.setName("xml")

  scope = {
    fields: fields,
    render: sub(target as object, node as object)
      target = target.addElement(node.subtype())
      m.addFields(target, node)

      if getInterface(node.content, "ifSGNodeChildren") <> invalid
        if node.content.isSubtype("ContentNode")
          m.render(target, node.content)
        end if
      end if

      for each nested in node.getChildren(-1, 0)
        m.render(target, nested)
      end for
    end sub,
    addFields: sub(target as object, node as object)
      includeBounds = true
      includeFocused = true

      if m.fields = invalid
        for each key in node.keys()
          m.addField(target, node, key)
        end for
      else
        includeBounds = false
        includeFocused = false

        for each fields in [m.fields["*"], m.fields[node.subtype()]]
          if fields <> invalid
            for each field in fields
              if node.doesExist(field)
                m.addField(target, node, field)
              else if field = "bounds"
                includeBounds = true
              else if field = "focused"
                includeFocused = true
              end if
            end for
          end if
        end for
      end if

      if includeBounds
        rect = node.sceneBoundingRect()
        if rect.width <> 0 and rect.height <> 0
          target.addAttribute("bounds", "[" + strI(rect.x).trim() + "," + strI(rect.y) + "," + strI(rect.width) + "," + strI(rect.height) + "]")
        end if
      end if

      if includeFocused
        isFocused = node.hasFocus()
        if isFocused
          target.addAttribute("focused", node.hasFocus().toStr())
        end if
      end if

      if getInterface(node.dialog, "ifSGNodeChildren") <> invalid
        m.render(target, node.dialog)
      end if
    end sub,
    addField: sub(target as object, node as object, fieldKey as string)
      fieldType = node.getFieldType(fieldKey)
      fieldValue = node.getField(fieldKey)

      if fieldValue <> invalid
        if fieldType = "color"
          fieldValue = "#" + StrI(fieldValue, 16)
        else if fieldType = "node"
          fieldValue = fieldValue.getField("id")
        else
          fieldValue = toSerializable(fieldValue)
        end if

        if fieldValue <> invalid
          target.addAttribute(fieldKey, toString(fieldValue))
        end if
      end if
    end sub
  }

  scope.render(xml, source)

  return xml.genXML(false)
end function

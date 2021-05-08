' import './helpers/serialization/toXML.brs'

function getAppUI(fields as object) as string
  return toXML(m.top.getScene(), fields)
end function

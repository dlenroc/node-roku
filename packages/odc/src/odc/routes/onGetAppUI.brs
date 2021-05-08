
' @Route('GET', '/app-ui')
sub onGetAppUI(request as object, response as object) as string
  fields = request.search.fields
  if fields <> invalid
    fields = parseJSON(fields)
  end if

  xml = m.top.getScene().callFunc("odc_getAppUI", fields)
  response.headers["Content-Type"] = "text/xml"

  return xml
end sub

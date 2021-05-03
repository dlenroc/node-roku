
' @Route('GET', '/app-ui')
function getAppUI(request, response)
  fields = request.search.fields
  if fields <> invalid then
    fields = parseJSON(fields)
  end if

  response.headers["Content-Type"] = "text/xml"
  response.body = m.top.getScene().callFunc("odc_get_source", fields)
end function


' @Route('GET', '/app-ui')
function getAppUI(request, response)
  response.headers["Content-Type"] = "text/xml"
  response.body = m.top.getScene().callFunc("odc_get_source")
  if response.body = invalid then
    response.body = odc_get_source()
  end if
end function

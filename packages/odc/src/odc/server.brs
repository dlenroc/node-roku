sub init()
  m.top.functionName = "start_server"
  m.top.control = "RUN"
end sub

sub start_server()
  server = HttpServer()
  server.addRoute("GET", "/app-ui", getAppUI)
  server.addRoute("GET", "/registry", getRegistry)
  server.addRoute("PATCH", "/registry", patchRegistry)
  server.addRoute("DELETE", "/registry", clearRegistry)
  server.listen(m.top.port)
end sub

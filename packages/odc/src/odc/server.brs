' import './helpers/server/HttpServer.brs'
' import './routes/onDeleteRegistry.brs'
' import './routes/onGetAppUI.brs'
' import './routes/onGetRegistry.brs'
' import './routes/onPatchRegistry.brs'

sub init()
  m.top.functionName = "start_server"
  m.top.control = "RUN"
end sub

sub start_server()
  server = HttpServer()
  server.addRoute("GET", "/app-ui", onGetAppUI)
  server.addRoute("GET", "/registry", onGetRegistry)
  server.addRoute("PATCH", "/registry", onPatchRegistry)
  server.addRoute("DELETE", "/registry", onDeleteRegistry)
  server.listen(m.top.port)
end sub

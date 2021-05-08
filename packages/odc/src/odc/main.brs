' import './helpers/registry/clearRegistry.brs'
' import './helpers/registry/patchRegistry.brs'

sub main(options as object)
  if options.odc_clear_registry = "true"
    clearRegistry()
  end if

  if options.odc_registry <> invalid
    patchRegistry(parseJson(options.odc_registry))
  end if
end sub

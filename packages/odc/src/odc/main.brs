' import './helpers/registry/clearRegistry.brs'
' import './helpers/registry/patchRegistry.brs'
' import './helpers/store/storeChannelData.brs'

sub main(options as object)
  if options.odc_clear_registry = "true"
    clearRegistry()
  end if

  if options.odc_registry <> invalid
    patchRegistry(parseJson(options.odc_registry))
  end if

  if options.odc_channel_data <> invalid
    storeChannelData(options.odc_channel_data)
  end if

  if options.odc_entry_point <> invalid
    if options.odc_entry_point = "screensaver"
      RunScreenSaver()
    else if options.odc_entry_point = "screensaver-settings"
      RunScreenSaverSettings()
    end if

    if options.odc_entry_point <> "channel"
      END
    end if
  end if
end sub

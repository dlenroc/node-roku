
function createDirectoryNested(path as string) as boolean
  fs = CreateObject("roFileSystem")
  paths = []

  while not fs.exists(path)
    paths.push(path)
    parent = createObject("roPath", path).split().parent
    if parent = invalid
      return false
    end if

    path = parent
  end while

  for i = paths.count() - 1 to 0 step -1
    created = fs.createDirectory(paths[i])
    if not created
      return false
    end if
  end for

  return true
end function

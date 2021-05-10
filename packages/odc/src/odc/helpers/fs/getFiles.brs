
function getFiles(root as string) as object
  fs = CreateObject("roFileSystem")
  files = fs.getDirectoryListing(root)
  results = []

  for i = 0 to files.count() - 1
    path = root + "/" + files[i]
    stat = fs.stat(path)
    result = {
      name: files[i],
      type: stat.type,
      permissions: stat.permissions
    }

    if stat.type = "file"
      result.size = stat.size
    else
      result.children = getFiles(path)
    end if

    results.push(result)
  end for

  return results
end function

# Changelog

## [2.1.1](https://github.com/dlenroc/node-roku/compare/odc-v2.1.0...odc-v2.1.1) (2024-07-09)


### Bug Fixes

* `ifAssociativeArray` serialization ([93f01ec](https://github.com/dlenroc/node-roku/commit/93f01ecd1533b289fda3dc3fd1d253b446442df4))

## [2.1.0](https://github.com/dlenroc/node-roku/compare/odc-v2.0.1...odc-v2.1.0) (2024-06-17)


### Features

* `odc_channel_data` launch parameter ([191bba0](https://github.com/dlenroc/node-roku/commit/191bba01a7573baa437c7481399b10979a2dc218))

## [2.0.1](https://github.com/dlenroc/node-roku/compare/odc-v2.0.0...odc-v2.0.1) (2023-12-23)


### Bug Fixes

* path separator used on `windows` ([264a83c](https://github.com/dlenroc/node-roku/commit/264a83c5935219c441443eadbe2e9ebf967c1cc7))

## [2.0.0](https://github.com/dlenroc/node-roku/compare/odc-v1.4.3...odc-v2.0.0) (2023-12-10)


### ⚠ BREAKING CHANGES

* ESM support and use of built-in dependencies ([566d124](https://github.com/dlenroc/node-roku/commit/566d124f45a031d90004aea378d8bf075b8db7be), [ca8f02c](https://github.com/dlenroc/node-roku/commit/ca8f02cd69d387e95a0e82e2ed52873f0ae476ff))

## [1.4.3](https://github.com/dlenroc/node-roku/compare/odc-v1.4.2...odc-v1.4.3) (2023-09-16)


### Bug Fixes

* task injection ([5f6cb4e](https://github.com/dlenroc/node-roku/commit/5f6cb4ec3e6ceb725fbdfeef1ea18be7e26805ff))

## [1.4.2](https://github.com/dlenroc/node-roku/compare/odc-v1.4.1...odc-v1.4.2) (2023-05-08)


### Bug Fixes

* command aborting ([ab7b6b4](https://github.com/dlenroc/node-roku/commit/ab7b6b4bda32521adce99793bf1f53a220991779))
* port configuration ([ab7b6b4](https://github.com/dlenroc/node-roku/commit/ab7b6b4bda32521adce99793bf1f53a220991779))

### [1.4.1](https://www.github.com/dlenroc/node-roku/compare/roku-odc-v1.4.0...roku-odc-v1.4.1) (2021-10-17)


### Bug Fixes

* handling whitespace in scene ([acdcf6c](https://www.github.com/dlenroc/node-roku/commit/acdcf6cd66662edbc4a1ebe932dc12650ac0902c))

## [1.4.0](https://www.github.com/dlenroc/node-roku/compare/roku-odc-v1.3.1...roku-odc-v1.4.0) (2021-07-25)


### Features

* screensaver support ([bdc8d26](https://www.github.com/dlenroc/node-roku/commit/bdc8d269f8b8fba7aa8646b9318830923b60f11c))

### [1.3.1](https://www.github.com/dlenroc/node-roku/compare/roku-odc-v1.3.0...roku-odc-v1.3.1) (2021-06-12)


### Bug Fixes

* exclusion of `bounds` and `focused` attributes ([a066e8b](https://www.github.com/dlenroc/node-roku/commit/a066e8bc0ba2397e31f29dc50b50330aa2088a5b))
* render `ContentNode` from lists and grids ([a90c991](https://www.github.com/dlenroc/node-roku/commit/a90c9919d9d8603e81f92f56366df48a8ec96420))

## [1.3.0](https://www.github.com/dlenroc/node-roku/compare/roku-odc-v1.2.0...roku-odc-v1.3.0) (2021-05-10)


### Features

* ability to download files using `pullFile` ([04f4acd](https://www.github.com/dlenroc/node-roku/commit/04f4acd9bf28832cbf17754c2609190cd73365ff))
* ability to list files using `getFiles` ([d376a0a](https://www.github.com/dlenroc/node-roku/commit/d376a0a435526f875ec210937cf4c63f942d44f0))
* ability to upload files using `pushFile` ([e7987ec](https://www.github.com/dlenroc/node-roku/commit/e7987ec4c13742334b0e0a419ddbee5c230dad2b))

## [1.2.0](https://www.github.com/dlenroc/node-roku/compare/roku-odc-v1.1.0...roku-odc-v1.2.0) (2021-05-08)


### Features

* ability to filter app-ui attributes ([ec0cc0d](https://www.github.com/dlenroc/node-roku/commit/ec0cc0d3a4cb17f4aed29e751b11b5176c54eaaf))
* allow serializable types in `patchRegistry` ([92074a1](https://www.github.com/dlenroc/node-roku/commit/92074a1bf8367423668dcdf45f05bc046215a9ea))
* fields with complex types in app-ui ([545a4ed](https://www.github.com/dlenroc/node-roku/commit/545a4ed34aec085ec87d2a01d0430bcc69967e49))


### Bug Fixes

* main method patching in files with `\r` ([e3321ed](https://www.github.com/dlenroc/node-roku/commit/e3321ed83d70c7827a97bd6b9ab13dd61fa8b8d7))

## [1.1.0](https://www.github.com/dlenroc/node-roku/compare/roku-odc-v1.0.0...roku-odc-v1.1.0) (2021-05-01)


### Features

* different name for extended app `<name> | <md5>` ([796e2c3](https://www.github.com/dlenroc/node-roku/commit/796e2c314124ecaeae1ef98c8e4f07aaabdf7643))
* launch parameters ([669fe7a](https://www.github.com/dlenroc/node-roku/commit/669fe7a215ce7411efce921d2d6c5ecb0112cbbe))

## 1.0.0 (2021-04-17)


### Features

* monorepo ([a0ce484](https://www.github.com/dlenroc/node-roku/commit/a0ce484ee2acdd9e6e183e515940ae8bf218d325))

# @dlenroc/roku-ecp · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-ecp)](https://www.npmjs.com/package/@dlenroc/roku-ecp)

Client for [external control protocol](https://developer.roku.com/en-gb/docs/developer-program/debugging/external-control-api.md#external-control-service-commands) provided on port `8060`

## Installation

```sh
npm install @dlenroc/roku-ecp
```

## Usage

```typescript
import { ECPExecutor, launch } from '@dlenroc/roku-ecp';

const ctx = new ECPExecutor({ address: 'http://<ip>' });
await launch(ctx, { id: 'dev' });
```

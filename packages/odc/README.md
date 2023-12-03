# @dlenroc/roku-odc · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-odc)](https://www.npmjs.com/package/@dlenroc/roku-odc)

Client for runtime utilities

## Installation

```sh
npm install @dlenroc/roku-odc
```

## Usage

> ⚠️ `extend(app)` must be used to inject backend into your application

```typescript
import { ODCExecutor, getRegistry } from '@dlenroc/roku-odc';

const ctx = new ODCExecutor({ address: '<ip>:8061' });
const registry = await getRegistry(ctx);
console.log(registry);
```

---

## Launch parameters

All of the above commands require the application to be up and running, but some of them can also be run using [ECP](/packages/ecp#readme) during startup

```typescript
await ecp.launch('dev', { odc_clear_registry: true });
```

```typescript
await ecp.launch('dev', { odc_registry: /* state */ })
```

```typescript
await ecp.launch('dev', {
  odc_entry_point: 'channel' | 'screensaver' | 'screensaver-settings',
});
```

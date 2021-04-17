# @dlenroc/roku-ecp · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-ecp)](https://www.npmjs.com/package/@dlenroc/roku-ecp)

Client for [external control protocol](https://developer.roku.com/en-gb/docs/developer-program/debugging/external-control-api.md#external-control-service-commands) provided on port `8060`

## Installation

```sh
npm install @dlenroc/roku-ecp
```

## Usage

```typescript
import ECP from '@dlenroc/roku';

const ecp = new ECP('<ip>');
const xml = await ecp.queryAppUI();

console.log(xml);
```

---

```typescript
queryAppUI(): Promise<string>
```

```typescript
queryIcon(appId: AppId): Promise<Buffer>
```

```typescript
queryApps(): Promise<App[]>
```

```typescript
queryActiveApp(): Promise<ActiveApp>
```

```typescript
queryMediaPlayer(): Promise<MediaInfo>
```

```typescript
queryDeviceInfo(): Promise<DeviceInfo>
```

```typescript
input(options: Params): Promise<void>
```

```typescript
search(options: Params): Promise<void>
```

```typescript
keydown(key: Key): Promise<void>
```

```typescript
keyup(key: Key): Promise<void>
```

```typescript
keypress(key: Key): Promise<void>
```

```typescript
type(keys: string): Promise<void>
```

```typescript
launch(appId: AppId, options?: Params): Promise<void>
```

```typescript
install(appId: AppId, options?: Params): Promise<void>
```

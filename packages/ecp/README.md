# @dlenroc/roku-ecp · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-ecp)](https://www.npmjs.com/package/@dlenroc/roku-ecp)

Client for [external control protocol](https://developer.roku.com/en-gb/docs/developer-program/debugging/external-control-api.md#external-control-service-commands) provided on port `8060`

## Installation

```sh
npm install @dlenroc/roku-ecp
```

## Usage

```typescript
import ECP from '@dlenroc/roku';

// const ecp = new ECP('<ip>');
const ecp = new ECP({ address: 'http://<ip>:8060' });

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
queryRegistry(appId: AppId, options?: Params): Promise<Failure | Registry>
```

```typescript
queryGraphicsFrameRate(): Promise<GraphicsFrameRate>
```

```typescript
queryChannelPerformance(appId: AppId, options?: Params): Promise<Failure | ChannelPerformance>
```

```typescript
queryR2D2Bitmaps(appId: AppId): Promise<Failure | R2D2Bitmaps>
```

```typescript
querySGNodesAll(appId: AppId): Promise<string>
```

```typescript
querySGNodesRoots(appId: AppId): Promise<string>
```

```typescript
querySGNodesNodes(appId: AppId, nodeId: number): Promise<string>
```

```typescript
querySGRendezvous(): Promise<string>
```

```typescript
trackSGRendezvous(appId: AppId): Promise<Failure | SGRendezvousStatus>
```

```typescript
untrackSGRendezvous(appId: AppId): Promise<Failure | SGRendezvousStatus>
```

```typescript
queryFWBeacons(): Promise<Failure | FWBeacons>
```

```typescript
trackFWBeacons(appId: AppId): Promise<Failure | FWBeaconsStatus>
```

```typescript
untrackFWBeacons(appId: AppId): Promise<Failure | FWBeaconsStatus>
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
type(text: string): Promise<void>
```

```typescript
launch(appId: AppId, options?: Params): Promise<void>
```

```typescript
install(appId: AppId, options?: Params): Promise<void>
```

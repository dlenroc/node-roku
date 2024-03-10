# @dlenroc/roku-ecp · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-ecp)](https://www.npmjs.com/package/@dlenroc/roku-ecp)

Client for [external control protocol](https://developer.roku.com/en-gb/docs/developer-program/debugging/external-control-api.md#external-control-service-commands) provided on port `8060`

## Installation

```sh
npm install @dlenroc/roku-ecp
```

## Usage

```typescript
import { ECPExecutor, launch } from '@dlenroc/roku-ecp';

const ctx = new ECPExecutor({ address: 'http://<ip>:8060' });
await launch(ctx, { appId: 'dev' });
```

## API

```ts
exitApp(payload: { appId: AppId }): Promise<boolean>
```

```ts
input(payload: Record<string, unknown>): Promise<void>
```

```ts
keydown(payload: { key: string }): Promise<void>
```

```ts
keypress(payload: { key: string }): Promise<void>
```

```ts
keyup(payload: { key: string }): Promise<void>
```

```ts
launch(payload: { appId: AppId; params?: Record<string, unknown> }): Promise<void>
```

```ts
queryActiveApp(): Promise<ActiveApp>
```

```ts
queryAppObjectCounts(): Promise<AppObjectCounts>
```

```ts
queryApps(config?: Config<Context>): Promise<App[]>
```

```ts
queryAppUI(): Promise<string>
```

```ts
queryChannelPerformance(payload?: { appId?: AppId; params?: Record<string, unknown> }): Promise<Failure | ChannelPerformance>
```

```ts
queryChannelState(payload: { appId: AppId }): Promise<ChannelState>
```

```ts
queryDeviceInfo(): Promise<DeviceInfo>
```

```ts
queryFWBeacons(): Promise<Failure | FWBeacons>
```

```ts
queryGraphicsFrameRate(): Promise<Failure | GraphicsFrameRate>
```

```ts
queryIcon(payload: { appId: AppId }): Promise<ArrayBuffer>
```

```ts
queryMediaPlayer(): Promise<MediaInfo>
```

```ts
queryR2D2Bitmaps(payload?: { appId?: AppId }): Promise<Failure | R2D2Bitmaps>
```

```ts
queryRegistry(payload: { appId: AppId }): Promise<Failure | Registry>
```

```ts
querySGNodesAll(payload?: { appId?: AppId }): Promise<string>
```

```ts
querySGNodesNodes(payload: { appId?: AppId; nodeId: string }): Promise<string>
```

```ts
querySGNodesRoots(payload?: { appId?: AppId }): Promise<string>
```

```ts
querySGRendezvous(): Promise<SGRendezvous>
```

```ts
search(payload: Record<string, unknown>): Promise<void>
```

```ts
trackFWBeacons(payload?: { appId?: AppId }): Promise<Failure | FWBeaconsStatus>
```

```ts
trackSGRendezvous(payload?: { appId?: AppId }): Promise<Failure | SGRendezvousStatus>
```

```ts
untrackFWBeacons(payload?: { appId?: AppId }): Promise<Failure | FWBeaconsStatus>
```

```ts
untrackSGRendezvous(payload?: { appId?: AppId }): Promise<Failure | SGRendezvousStatus>
```

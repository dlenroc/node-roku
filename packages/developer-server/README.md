# @dlenroc/roku-developer-server · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-developer-server)](https://www.npmjs.com/package/@dlenroc/roku-developer-server)

Client for [host utilities](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) provided via a web page at `http://<ip>`

## Installation

```sh
npm install @dlenroc/roku-developer-server
```

## Usage

```typescript
import fs from 'fs';
import DeveloperServer from '@dlenroc/roku';

const app = fs.readFileSync('<path_to_channel>');

// const developerServer = new DeveloperServer('<ip>', '<username>', '<password>');
const developerServer = new DeveloperServer({ address: 'http://<ip>', username: '<username>', password: '<password>' });

await developerServer.install(app);
```

---

```typescript
install(app: Buffer): Promise<void>
```

```typescript
delete(): Promise<void>
```

```typescript
convertToCramFs(): Promise<void>
```

```typescript
convertToSquashFs(): Promise<void>
```

```typescript
package(name: string, password: string): Promise<void>
```

```typescript
deletePackage(): Promise<void>
```

```typescript
getPackage(): Promise<Buffer>
```

```typescript
rekey(pkg: Buffer, password: string): Promise<void>
```

```typescript
getScreenshot(): Promise<Buffer>
```

```typescript
getProfilingData(): Promise<Buffer>
```

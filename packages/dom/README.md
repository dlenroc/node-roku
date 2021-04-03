# @dlenroc/roku-dom · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-dom)](https://www.npmjs.com/package/@dlenroc/roku-dom)

DOM-like representation of the app-ui

## Installation

```sh
npm install @dlenroc/roku-dom
```

## Usage

> ⚠️ `render()` must be called for synchronizing DOM with application state

```typescript
import fs from 'fs';
import SDK from '@dlenroc/roku';

const sdk = new SDK('<ip>', '<username>', '<password>');

// Sync DOM
await sdk.document.render();

const element = sdk.document.cssSelect('[text="Play"]');
console.log(element.isFocused);
```

### Document

Everything from [Element](#element) ➕

```typescript
get context(): 'ECP' | 'ODC'
```

```typescript
set context(context: 'ECP' | 'ODC')
```

```typescript
get focusedElement(): Element
```

```typescript
get isKeyboardShown(): boolean
```

```typescript
render(): Promise<void>
```

### Element

```typescript
get sdk(): SDK
```

```typescript
get document(): Document
```

```typescript
get parent(): Element | null
```

```typescript
get parents(): Element[]
```

```typescript
get siblings(): Element[]
```

```typescript
get prev(): Element | null
```

```typescript
get next(): Element | null
```

```typescript
get children(): Element[]
```

```typescript
get tag(): string
```

```typescript
get path(): string
```

```typescript
get index(): number
```

```typescript
get attributes(): Record<string, string>
```

```typescript
get text(): string
```

```typescript
get bounds(): Rect | null
```

```typescript
get isConnected(): boolean
```

```typescript
get isFocused(): boolean
```

```typescript
get isInFocusChain(): boolean
```

```typescript
get isDisplayed(): boolean
```

```typescript
isSameNode(element: Element): boolean
```

```typescript
clear(): Promise<void>
```

```typescript
type(text: string): Promise<void>
```

```typescript
append(text: string): Promise<void>
```

```typescript
select(): Promise<void>
```

```typescript
focus(): Promise<void>
```

```typescript
cssSelect(css: string): Element | null
```

```typescript
cssSelect(css: string, timeoutInSeconds: number): Promise<Element | null>
```

```typescript
cssSelectAll(css: string): Element[]
```

```typescript
cssSelectAll(css: string, timeoutInSeconds: number): Promise<Element[]>
```

```typescript
xpathSelect(xpath: string): Element | null
```

```typescript
xpathSelect(xpath: string, timeoutInSeconds: number): Promise<Element | null>
```

```typescript
xpathSelectAll(xpath: string): Element[]
```

```typescript
xpathSelectAll(xpath: string, timeoutInSeconds: number): Promise<Element[]>
```

```typescript
toString(): string
```

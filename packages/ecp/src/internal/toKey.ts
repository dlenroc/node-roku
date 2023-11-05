import { ECPError } from '../ECPError.js';

export function toKey(key: string): string {
  if (!key) {
    throw new ECPError('key is required');
  }

  if (key.length === 1) {
    key = `LIT_${encodeURIComponent(key)}`;
  }

  return key;
}

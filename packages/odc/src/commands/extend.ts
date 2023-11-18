import inject from '../internal/injector.js';

export async function extend(app: Buffer): Promise<Buffer> {
  return await inject(app);
}

import injectODC from '../internal/injector.js';

export async function inject(app: ArrayBuffer): Promise<ArrayBuffer> {
  return await injectODC(app);
}

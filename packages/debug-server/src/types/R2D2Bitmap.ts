export type R2D2Bitmap = {
  /**
   * The address of the bitmap.
   */
  address: string;

  /**
   * The width of the bitmap.
   */
  width: number;

  /**
   * The height of the bitmap.
   */
  height: number;

  /**
   * The bits per pixel of the bitmap.
   */
  bpp: number;

  /**
   * The size of the bitmap in bytes.
   */
  size: number;

  /**
   * The buffer size of the bitmap in bytes.
   */
  bufSz: number;

  /**
   * The texture ID of the bitmap.
   */
  tex: number;

  /**
   * The framebuffer ID of the bitmap.
   */
  fbo: number;

  /**
   * The name/path of the bitmap.
   */
  name: string;
};

export function toFormData(params?: Record<string, string | Blob>): FormData {
  const formData = new FormData();

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      formData.append(key, value);
    }
  }

  return formData;
}

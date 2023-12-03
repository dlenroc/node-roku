export function fromFormData(
  formData: FormData
): Record<string, string | Blob | (string | Blob)[]> {
  const result: Record<string, string | Blob | (string | Blob)[]> = {};

  for (const [key, value] of formData.entries()) {
    if (key in result) {
      const previousValue = result[key];
      if (Array.isArray(previousValue)) {
        (result[key] as any[]).push(value);
      } else {
        result[key] = [previousValue!, value];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

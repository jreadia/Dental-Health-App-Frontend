import { fetchClient } from './client';

export async function uploadDentalImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  return fetchClient('/dental-images', {
    method: 'POST',
    // Note: Do not manually set Content-Type to multipart/form-data.
    // fetch automatically sets it with the correct boundary when body is FormData.
    body: formData,
  });
}

export async function getUserImageHistory(limit?: number) {
  const url = limit ? `/dental-images?limit=${limit}` : '/dental-images';
  return fetchClient(url, {
    method: 'GET',
  });
}

export async function getDentalImageById(imageId: string) {
  return fetchClient(`/dental-images/${imageId}`, {
    method: 'GET',
  });
}

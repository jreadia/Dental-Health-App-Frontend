import { fetchClient } from './client';

let cachedAdmins: unknown = null;
let adminsFetchTime = 0;

export function invalidateAdminsCache() {
  cachedAdmins = null;
}

export async function getAdmins() {
  if (cachedAdmins && Date.now() - adminsFetchTime < 60000) {
    return cachedAdmins;
  }
  const response = await fetchClient('/admins', { method: 'GET' });
  cachedAdmins = response;
  adminsFetchTime = Date.now();
  return response;
}

export async function deleteAdmin(id: string) {
  invalidateAdminsCache();
  return fetchClient(`/admins/${id}`, { method: 'DELETE' });
}

export async function updateAdmin(id: string, data: unknown) {
  invalidateAdminsCache();
  return fetchClient(`/admins/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

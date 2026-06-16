import { fetchClient } from './client';

export async function getAdmins() {
  return fetchClient('/admins', { method: 'GET' });
}

export async function deleteAdmin(id: string) {
  return fetchClient(`/admins/${id}`, { method: 'DELETE' });
}

export async function updateAdmin(id: string, data: unknown) {
  return fetchClient(`/admins/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

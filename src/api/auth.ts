import { fetchClient } from './client';

export async function registerUser(userData: any) {
  return fetchClient('/auth/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function loginUser(credentials: any) {
  return fetchClient('/auth/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function logoutUser() {
  return fetchClient('/auth/users/logout', {
    method: 'POST',
  });
}

export async function registerAdmin(adminData: any) {
  return fetchClient('/auth/admins/register', {
    method: 'POST',
    body: JSON.stringify(adminData),
  });
}

export async function loginAdmin(credentials: any) {
  return fetchClient('/auth/admins/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function logoutAdmin() {
  return fetchClient('/auth/admins/logout', {
    method: 'POST',
  });
}

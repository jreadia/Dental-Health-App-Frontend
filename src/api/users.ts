import { fetchClient } from './client';

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  banned: number;
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  createdAt?: string | { _seconds: number, _nanoseconds: number };
  [key: string]: unknown;
}

export interface GetUsersResponse {
  users: User[];
  nextCursor: string | null;
  hasMore: boolean;
}

export async function getUsers(params: { search?: string; limit?: number; cursor?: string | null }) {
  const q = new URLSearchParams();
  if (params.search) q.append('search', params.search);
  if (params.limit) q.append('limit', params.limit.toString());
  if (params.cursor) q.append('cursor', params.cursor);
  
  return fetchClient(`/users?${q.toString()}`, { method: 'GET' }) as Promise<GetUsersResponse>;
}

export async function getUserStats() {
  return fetchClient('/users/stats', { method: 'GET' }) as Promise<UserStats>;
}

export async function updateUserStatus(userId: string, status: 'ACTIVE' | 'INACTIVE' | 'BANNED') {
  return fetchClient(`/users/${userId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export async function removeUser(userId: string) {
  return fetchClient(`/users/${userId}`, { method: 'DELETE' });
}

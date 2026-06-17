import { fetchClient } from './client';

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
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

let cachedStats: UserStats | null = null;
let statsFetchTime = 0;
let cachedInitialUsers: GetUsersResponse | null = null;
let usersFetchTime = 0;

export function invalidateUsersCache() {
  cachedStats = null;
  cachedInitialUsers = null;
}

export async function getUsers(params: { search?: string; limit?: number; cursor?: string | null }) {
  const isInitialFetch = !params.search && params.limit === 5 && !params.cursor;
  if (isInitialFetch && cachedInitialUsers && Date.now() - usersFetchTime < 60000) {
    return cachedInitialUsers;
  }

  const q = new URLSearchParams();
  if (params.search) q.append('search', params.search);
  if (params.limit) q.append('limit', params.limit.toString());
  if (params.cursor) q.append('cursor', params.cursor);
  
  const response = await fetchClient(`/users?${q.toString()}`, { method: 'GET' }) as GetUsersResponse;
  
  if (isInitialFetch) {
    cachedInitialUsers = response;
    usersFetchTime = Date.now();
  }
  return response;
}

export async function getUserStats() {
  if (cachedStats && Date.now() - statsFetchTime < 60000) {
    return cachedStats;
  }
  const response = await fetchClient('/users/stats', { method: 'GET' }) as UserStats;
  cachedStats = response;
  statsFetchTime = Date.now();
  return response;
}

export async function updateUserStatus(userId: string, status: 'ACTIVE' | 'INACTIVE' | 'BANNED') {
  invalidateUsersCache();
  return fetchClient(`/users/${userId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export async function removeUser(userId: string) {
  invalidateUsersCache();
  return fetchClient(`/users/${userId}`, { method: 'DELETE' });
}

export interface DentalImage {
  imageId: string;
  uploadDate?: string | { _seconds: number, _nanoseconds: number };
  imageUrl?: string;
  annotatedImageUrl?: string;
  mlResults?: {
    boxes?: unknown[];
    overall_diagnosis?: string;
  };
  diagnosis?: {
    oralHealthStatus?: string;
  };
  [key: string]: unknown;
}

export async function getUserDentalImagesAdmin(userId: string, limit?: number) {
  const query = limit ? `?limit=${limit}` : '';
  return fetchClient(`/users/${userId}/dental-images${query}`, { method: 'GET' }) as Promise<DentalImage[]>;
}

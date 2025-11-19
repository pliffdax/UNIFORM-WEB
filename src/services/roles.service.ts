import { apiClient } from '@/lib/api/client';
import { Role, CreateRoleDto, UpdateRoleDto } from '@/types/role.types';

export async function getAllRoles(): Promise<Role[]> {
  return apiClient<Role[]>('/roles');
}

export async function getRoleById(id: number): Promise<Role> {
  return apiClient<Role>(`/roles/${id}`);
}

export async function createRole(data: CreateRoleDto): Promise<Role> {
  return apiClient<Role>('/roles', {
    method: 'POST',
    body: data,
  });
}

export async function updateRole(id: number, data: UpdateRoleDto): Promise<Role> {
  return apiClient<Role>(`/roles/${id}`, {
    method: 'PATCH',
    body: data,
  });
}

export async function deleteRole(id: number): Promise<void> {
  await apiClient<void>(`/roles/${id}`, {
    method: 'DELETE',
  });
}

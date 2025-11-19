import React from 'react';
import Link from 'next/link';

import { getAllRoles } from '@/services/roles.service';
import { Role } from '@/types/role.types';

export default async function RolesListPage() {
  let roles: Role[] = [];
  let error: string | null = null;

  try {
    roles = await getAllRoles();
  } catch (err) {
    console.error('Failed to fetch roles:', err);
    error = 'Не вдалося завантажити список ролей. Спробуйте оновити сторінку.';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Ролі</h1>
        <Link
          href="/roles/create"
          className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Створити роль
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 border border-red-300 p-4 text-red-800">
          {error}
        </div>
      )}

      {!error && roles.length === 0 && (
        <div className="text-gray-500">Поки що немає жодної ролі. Створіть першу роль.</div>
      )}

      {!error && roles.length > 0 && (
        <div className="overflow-x-auto border rounded-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Назва
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Опис
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Створено
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Оновлено
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map(role => (
                <tr key={role.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{role.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{role.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{role.description || '—'}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(role.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(role.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

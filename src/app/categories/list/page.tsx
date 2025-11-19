import React from 'react';
import Link from 'next/link';

import { getAllCategories } from '@/services/categories.service';
import { Category } from '@/types/category.types';

export default async function CategoriesListPage() {
  let categories: Category[] = [];
  let error: string | null = null;

  try {
    categories = await getAllCategories();
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    error = 'Не вдалося завантажити список категорій. Спробуйте оновити сторінку.';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Категорії</h1>
        <Link
          href="/categories/create"
          className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Створити категорію
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 border border-red-300 p-4 text-red-800">
          {error}
        </div>
      )}

      {!error && categories.length === 0 && (
        <div className="text-gray-500">
          Поки що немає жодної категорії. Створіть першу категорію.
        </div>
      )}

      {!error && categories.length > 0 && (
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
                  Slug
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
              {categories.map(category => (
                <tr key={category.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{category.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{category.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{category.slug}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(category.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(category.updatedAt).toLocaleString()}
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

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createCategory } from '@/services/categories.service';
import { CreateCategoryDto } from '@/types/category.types';

export default function CreateCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Назва категорії є обовʼязковою.');
      return;
    }

    const payload: CreateCategoryDto = {
      name: name.trim(),
      slug: slug.trim() || undefined,
    };

    setIsSubmitting(true);
    try {
      await createCategory(payload);
      router.push('/categories/list');
    } catch (err) {
      console.error('Failed to create category', err);
      setError('Не вдалося створити категорію. Спробуйте пізніше.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Створення категорії</h1>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 p-6 bg-white rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Назва *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Наприклад: Web, Algorithms, Databases..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Наприклад: web, algorithms, databases"
          />
          <p className="mt-1 text-xs text-gray-500">
            Якщо не вказати, slug може бути згенерований на сервері з назви.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Збереження...' : 'Створити категорію'}
          </button>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
}

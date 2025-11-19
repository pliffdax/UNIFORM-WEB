'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createRole } from '@/services/roles.service';
import { CreateRoleDto } from '@/types/role.types';

export default function CreateRolePage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Назва ролі є обовʼязковою.');
      return;
    }

    const payload: CreateRoleDto = {
      name: name.trim(),
      description: description.trim() || undefined,
    };

    setIsSubmitting(true);
    try {
      await createRole(payload);
      router.push('/roles/list');
    } catch (err) {
      console.error('Failed to create role', err);
      setError('Не вдалося створити роль. Спробуйте пізніше.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Створення ролі</h1>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 p-6 bg-white rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Назва *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Наприклад: admin, moderator, student"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={3}
            placeholder="Короткий опис того, для чого потрібна ця роль"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Збереження...' : 'Створити роль'}
          </button>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
}

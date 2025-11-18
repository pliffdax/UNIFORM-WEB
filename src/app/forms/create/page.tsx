'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/AuthContext';
import { createQuestion } from '@/services/questions.service';
import { CreateQuestionDto } from '@/types/question.types';

export default function CreateQuestionPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Заголовок і текст питання не можуть бути порожніми.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    if (!user) {
      setError('Помилка: Користувач не знайдений. Спробуйте увійти знову.');
      setIsSubmitting(false);
      return;
    }

    const createDto: CreateQuestionDto = {
      questionName: title,
      questionText: body,
      category: category,
      status: 'active',
      userid: user.id,
    };

    try {
      console.log('Відправка на бекенд:', createDto);

      await createQuestion(createDto);

      router.push('/forms/list');
    } catch (err) {
      console.error(err);
      setError('Не вдалося створити питання. Проблема з API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return <div>Завантаження...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Доступ заборонено</h1>
        <p>
          Будь ласка,{' '}
          <a href="/login" className="text-indigo-600">
            увійдіть в систему
          </a>
          , щоб задати питання.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Задати нове питання</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <label className="block text-sm font-medium text-gray-700">
            Заголовок
            <p className="text-xs text-gray-500 mb-1">
              Будьте конкретні і уявіть, що задаєте питання іншій людині.
            </p>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Наприклад, «Як виправити помилку 404 в Next.js?'"
              required
            />
          </label>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <label className="block text-sm font-medium text-gray-700">
            Суть питання
            <p className="text-xs text-gray-500 mb-1">
              Опишіть все, що ви знаєте, щоб допомогти людям відповісти на ваше запитання.
            </p>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={10}
              placeholder="Опишіть вашу проблему детальніше..."
              required
            />
          </label>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <label className="block text-sm font-medium text-gray-700">
            Категорія (Теги)
            <p className="text-xs text-gray-500 mb-1">
              Вкажіть категорію або теги (наприклад: &laquo;web&raquo;, &laquo;nextjs&raquo;,
              &laquo;typescript&raquo;)
            </p>
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="web, typescript, ..."
            />
          </label>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={isSubmitting || authLoading}
            className="inline-flex justify-center py-2 px-4 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Публікація...' : 'Опублікувати питання'}
          </button>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
}

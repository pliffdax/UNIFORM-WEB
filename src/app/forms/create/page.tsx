'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- Шаг 1: НОВЫЕ ИМПОРТЫ ---
import { useAuth } from '@/contexts/AuthContext';
// Используем НОВЫЙ сервис
import { createQuestion } from '@/services/questions.service';
// Используем НОВЫЕ типы
import { CreateQuestionDto } from '@/types/question.types';

export default function CreateQuestionPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // --- Шаг 2: НОВЫЙ СТЕЙТ (для Q&A) ---
  const [title, setTitle] = useState(''); // Это будет `questionName`
  const [body, setBody] = useState(''); // Это будет `questionText`
  const [category, setCategory] = useState(''); // Это будет `category` (или "теги")

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Шаг 3: НОВЫЙ ОБРАБОТЧИК ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Заголовок и текст вопроса не могут быть пустыми.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Готовим DTO согласно question.types.ts
    if (!user) {
      setError('Ошибка: Пользователь не найден. Попробуйте войти снова.');
      setIsSubmitting(false); // Не забываем остановить индикатор загрузки
      return;
    }

    // Готовим DTO согласно question.types.ts
    const createDto: CreateQuestionDto = {
      questionName: title,
      questionText: body,
      category: category,
      status: 'active', // Устанавливаем статус по умолчанию
      // --- 2. ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ ---
      userid: user.id, // <-- Мы точно знаем, что user.id это 'string'
    };

    try {
      console.log('Отправка на бэкенд:', createDto);

      // Вызываем НОВЫЙ сервис
      await createQuestion(createDto);

      // Отправляем на НОВЫЙ список вопросов
      router.push('/forms/list');
    } catch (err) {
      console.error(err);
      setError('Не удалось создать вопрос. Проблема с API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Шаг 4: ПРОВЕРКА АВТОРИЗАЦИИ ---
  if (authLoading) {
    return <div>Загрузка...</div>;
  }

  // Только авторизованные пользователи могут создавать
  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Доступ запрещен</h1>
        <p>
          Пожалуйста,{' '}
          <a href="/login" className="text-indigo-600">
            войдите в систему
          </a>
          , чтобы задать вопрос.
        </p>
      </div>
    );
  }

  // --- Шаг 5: НОВЫЙ JSX (Форма для Q&A) ---
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Задать новый вопрос</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Блок 1: Заголовок вопроса */}
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <label className="block text-sm font-medium text-gray-700">
            Заголовок
            <p className="text-xs text-gray-500 mb-1">
              Будьте конкретны и представьте, что задаете вопрос другому человеку.
            </p>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Например, 'Как исправить ошибку 404 в Next.js?'"
              required
            />
          </label>
        </div>

        {/* Блок 2: Тело вопроса */}
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <label className="block text-sm font-medium text-gray-700">
            Тело вопроса
            <p className="text-xs text-gray-500 mb-1">
              Опишите все, что вы знаете, чтобы помочь людям ответить на ваш вопрос.
            </p>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={10}
              placeholder="Опишите вашу проблему подробнее..."
              required
            />
          </label>
        </div>

        {/* Блок 3: Категория/Теги */}
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <label className="block text-sm font-medium text-gray-700">
            Категория (Теги)
            <p className="text-xs text-gray-500 mb-1">
              Укажите категорию или теги (например: &laquo;web&raquo;, &laquo;nextjs&raquo;,
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

        {/* Блок 4: Отправка */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={isSubmitting || authLoading}
            className="inline-flex justify-center py-2 px-4 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Публикация...' : 'Опубликовать вопрос'}
          </button>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
}

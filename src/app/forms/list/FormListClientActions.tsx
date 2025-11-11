'use client'; // <--- Этот компонент - клиентский!

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext'; // Используем твой хук

// Принимаем ошибку из серверного компонента
interface Props {
  initialError: string | null;
}

export default function FormListClientActions({ initialError }: Props) {
  // --- Шаг 1: Используем хуки ---
  const { user, loading: authLoading } = useAuth();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Список форм</h1>

      {/* --- Шаг 2: Кнопка "Создать" --- */}
      {/* Показываем кнопку, только если:
        1. Загрузка AuthContext завершена (authLoading = false)
        2. Пользователь авторизован (user = true)
      */}
      {!authLoading && user && (
        <Link
          href="/forms/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          + Создать новую форму
        </Link>
      )}

      {/* --- Шаг 3: Отображение ошибки --- */}
      {/* Если серверный компонент поймал ошибку, показываем ее здесь */}
      {initialError && (
        <div className="w-full p-4 text-center text-red-700 bg-red-100 rounded-lg">
          {initialError}
        </div>
      )}
    </div>
  );
}

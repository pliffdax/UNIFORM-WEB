// Это Серверный Компонент. "use client" здесь НЕТ.
import React from 'react';
import Link from 'next/link';

// --- Шаг 1: Импорты для получения данных ---
// Мы импортируем сервис и типы
import { getAllForms } from '@/services/forms.service';
import { Form } from '@/types/form.types';

// Импортируем наш будущий клиентский компонент
import FormListClientActions from './FormListClientActions';

// --- Шаг 2: Получение данных на сервере ---
// Компонент `async`, он ждет, пока данные загрузятся
export default async function FormsListPage() {
  let forms: Form[] = [];
  let error: string | null = null;

  try {
    // Вызываем сервис напрямую. Это происходит на сервере.
    forms = await getAllForms();
  } catch (err) {
    console.error('Failed to fetch forms:', err);
    error = 'Не удалось загрузить список форм. Попробуйте обновить страницу.';
  }

  // --- Шаг 3: Рендеринг ---
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Верхняя часть: Заголовок + Клиентский компонент для кнопки "Создать".
        Мы передаем `error` в клиентский компонент, чтобы он мог
        показать ошибку, если она произошла.
      */}
      <FormListClientActions initialError={error} />

      {/* Блок 4: Отображение списка форм */}
      {!error && forms.length > 0 && (
        <div className="space-y-4">
          {forms.map(form => (
            <Link
              href={`/forms/${form.id}`} // Ссылка на страницу просмотра формы
              key={form.id}
              className="block p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-indigo-600">{form.title}</h2>
              <p className="text-gray-600 mt-1">{form.description || 'Нет описания'}</p>
              <div className="text-sm text-gray-400 mt-2">
                ID: {form.id} | Создана: {new Date(form.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Блок 5: Состояние "Нет форм" */}
      {!error && forms.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <h2 className="text-2xl">Формы не найдены</h2>
          <p className="mt-2">Пока не создано ни одной формы. Нажмите "Создать", чтобы начать.</p>
        </div>
      )}
    </div>
  );
}

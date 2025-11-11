// Это Серверный Компонент. "use client" здесь НЕТ.
import React from 'react';
import Link from 'next/link';

// --- ШаГ 1: ИЗМЕНЕННЫЕ ИМПОРТЫ ---
// Импортируем наш НОВЫЙ сервис
import { getAllQuestions } from '@/services/questions.service';
// Импортируем тип Вопроса (из Q&A)
import { Question } from '@/types/question.types';

// --- Шаг 2: Получение Вопросов (не Форм) ---
export default async function QuestionsListPage() {
  let questions: Question[] = [];
  let error: string | null = null;

  try {
    // Вызываем НОВЫЙ сервис
    questions = await getAllQuestions();
  } catch (err) {
    console.error('Failed to fetch questions:', err);
    error = 'Не удалось загрузить список вопросов. Попробуйте обновить страницу.';
  }

  // --- Шаг 3: Рендеринг (стиль Q&A) ---
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Заголовок (кнопка "Создать" теперь в Aside) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Все вопросы</h1>
      </div>

      {/* Вывод ошибки, если есть */}
      {error && (
        <div className="w-full p-4 text-center text-red-700 bg-red-100 rounded-lg">{error}</div>
      )}

      {/* Блок 4: Отображение списка Вопросов */}
      {!error && questions.length > 0 && (
        <div className="border border-gray-200 rounded-lg">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`flex p-4 ${index > 0 ? 'border-t border-gray-200' : ''} hover:bg-gray-50`}
            >
              {/* Левая часть: Статистика */}
              <div className="flex flex-col items-end w-24 flex-shrink-0 mr-4 text-sm text-gray-500">
                <span className="text-lg font-semibold">{question.likes}</span>
                <span>лайков</span>
                {/* <span className="mt-2">{question.answers?.length || 0}</span>
                <span>ответов</span> */}
              </div>

              {/* Правая часть: Заголовок и инфо */}
              <div className="flex-grow">
                {/* Ссылка на страницу просмотра (мы ее тоже переделаем) */}
                <Link
                  href={`/forms/${question.id}`} // Мы переиспользуем /forms/[id]
                  className="text-xl font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  {question.questionName}
                </Link>
                <p className="text-gray-600 mt-1 line-clamp-2">{question.questionText}</p>
                <div className="text-sm text-gray-400 mt-2">
                  <span>Задан: {new Date(question.createdAt).toLocaleDateString()}</span>
                  {/* (Тут можно добавить инфо о пользователе, если надо) */}
                  {/* <span className="ml-2">by {question.user?.username}</span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Блок 5: Состояние "Нет вопросов" */}
      {!error && questions.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <h2 className="text-2xl">Вопросы не найдены</h2>
          <p className="mt-2">
            Пока не создано ни одного вопроса. Нажмите &laquo;Создать вопрос&raquo; в меню, чтобы
            начать.
          </p>
        </div>
      )}
    </div>
  );
}

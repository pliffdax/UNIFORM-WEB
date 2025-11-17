import React from 'react';
import Link from 'next/link';

import { getAllQuestions } from '@/services/questions.service';
import { Question } from '@/types/question.types';

export default async function QuestionsListPage() {
  let questions: Question[] = [];
  let error: string | null = null;

  try {
    questions = await getAllQuestions();
  } catch (err) {
    console.error('Failed to fetch questions:', err);
    error = 'Не вдалося завантажити список питань. Спробуйте оновити сторінку.';
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Всі питання</h1>
      </div>

      {error && (
        <div className="w-full p-4 text-center text-red-700 bg-red-100 rounded-lg">{error}</div>
      )}

      {!error && questions.length > 0 && (
        <div className="border border-gray-200 rounded-lg">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`flex p-4 ${index > 0 ? 'border-t border-gray-200' : ''} hover:bg-gray-50`}
            >
              <div className="flex flex-col items-end w-24 flex-shrink-0 mr-4 text-sm text-gray-500">
                <span className="text-lg font-semibold">{question.likes}</span>
                <span>лайків</span>
              </div>

              <div className="flex-grow">
                <Link
                  href={`/forms/${question.id}`}
                  className="text-xl font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  {question.questionName}
                </Link>
                <p className="text-gray-600 mt-1 line-clamp-2">{question.questionText}</p>
                <div className="text-sm text-gray-400 mt-2">
                  <span>Задано: {new Date(question.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!error && questions.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <h2 className="text-2xl">Питаннь не знайдено</h2>
          <p className="mt-2">
            Поки що не створено жодного питання. Натисніть &laquo;Створити питання&raquo; в меню,
            щоб почати.
          </p>
        </div>
      )}
    </div>
  );
}

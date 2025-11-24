'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// --- Шаг 1: Импорты Q&A ---
import { useAuth } from '@/contexts/AuthContext';
import { getQuestionById } from '@/services/questions.service';
// Предполагаем, что src/services/answers.service.ts УЖЕ СОЗДАН, как я обещал
import { createAnswer } from '@/services/answers.service';
import { QuestionWithDetails } from '@/types/question.types';
// Используем ТВОИ типы из answer.types.ts
import { CreateAnswerDto, Answer } from '@/types/answer.types';

export default function QuestionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  const questionId = Number(params.id);

  // --- Шаг 2: Стейт (Q&A) ---
  const [question, setQuestion] = useState<QuestionWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Стейт для формы "Написать ответ"
  const [newAnswerText, setNewAnswerText] = useState('');
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);

  // --- Шаг 3: Загрузка данных (Q&A) ---
  useEffect(() => {
    if (!questionId) return;

    async function loadQuestionData() {
      try {
        setLoading(true);
        setError(null);

        // Используем сервис Q&A
        const data = await getQuestionById(questionId);
        setQuestion(data);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить вопрос. Возможно, он не существует.');
      } finally {
        setLoading(false);
      }
    }

    void loadQuestionData();
  }, [questionId]);

  // --- Шаг 4: Обработчик отправки ОТВЕТА (исправленный) ---
  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !question) {
      setError('Вы должны войти в систему, чтобы отвечать.');
      return;
    }
    if (!newAnswerText.trim()) {
      setError('Ответ не может быть пустым.');
      return;
    }

    setIsSubmittingAnswer(true);
    setError(null);

    // Собираем DTO согласно ТВОЕМУ src/types/answer.types.ts
    const answerDto: CreateAnswerDto = {
      answerText: newAnswerText,
      questionId: question.id,
      category: question.category, // Отправляем категорию, как требует твой тип
    };

    try {
      // Отправляем новый ответ
      const savedAnswer = await createAnswer(answerDto);

      // Обновляем UI: добавляем новый ответ в список
      setQuestion(prevQuestion => {
        if (!prevQuestion) return null;

        // `savedAnswer` имеет тип `Answer`, все совпадает
        return {
          ...prevQuestion,
          answers: [...prevQuestion.answers, savedAnswer],
        };
      });
      setNewAnswerText(''); // Очищаем поле ввода
    } catch (err) {
      console.error(err);
      setError('Не удалось отправить ответ.');
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  // --- Шаг 5: Рендеринг (JSX) ---

  if (loading || authLoading) {
    return <div className="container mx-auto p-4 text-center">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Ошибка</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">Вопрос не найден</h1>
      </div>
    );
  }

  // --- Основная разметка страницы ---
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* --- Блок 1: Сам Вопрос --- */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex">
          {/* Блок лайков (пока статичный) */}
          <div className="flex flex-col items-center mr-4 w-12">
            <button className="text-gray-400 hover:text-indigo-600">▲</button>
            <span className="text-2xl font-bold">{question.likes}</span>
            <button className="text-gray-400 hover:text-indigo-600">▼</button>
          </div>

          {/* Тело вопроса */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-4">{question.questionName}</h1>
            {/* `whitespace-pre-wrap` сохраняет переносы строк из <textarea> */}
            <p className="text-gray-800 whitespace-pre-wrap mb-4">{question.questionText}</p>]
            <div className="text-sm text-gray-500">
              <span className="mr-2">Категория: {question.category}</span>
              <span>
                {/* `question.user` теперь доступен из `QuestionWithDetails` */}
                Задан: {new Date(question.createdAt).toLocaleString()}
                {question.user && (
                  <span className="ml-2">
                    автором <span className="font-semibold">{question.user.username}</span>
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Блок 2: Список Ответов --- */}
      <h2 className="text-2xl font-bold mb-4">
        {question.answers.length} {question.answers.length === 1 ? 'Ответ' : 'Ответов'}
      </h2>

      <div className="space-y-6 mb-8">
        {/* Используем тип `Answer` из твоего `answer.types.ts` */}
        {question.answers.map((answer: Answer) => (
          <div key={answer.id} className="bg-white p-6 rounded-lg shadow-sm flex">
            {/* Блок лайков (для ответа) */}
            <div className="flex flex-col items-center mr-4 w-12">
              <button className="text-gray-400 hover:text-indigo-600">▲</button>
              <span className="text-xl font-bold">{answer.likes}</span>
              <button className="text-gray-400 hover:text-indigo-600">▼</button>
            </div>

            {/* Тело ответа */}
            <div className="flex-grow">
              <p className="text-gray-800 whitespace-pre-wrap">{answer.answerText}</p>
              <div className="text-sm text-gray-500 mt-4">
                {/* `answer.user` будет доступен, если `QuestionWithDetails`
                    возвращает `AnswerWithUser[]` вместо `Answer[]`.
                    Пока используем `userid`
                */}
                Ответил: (ID пользователя {answer.userid})
                {new Date(answer.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        {question.answers.length === 0 && (
          <p className="text-gray-500">На этот вопрос еще нет ответов. Станьте первым!</p>
        )}
      </div>

      {/* --- Блок 3: Форма "Ваш Ответ" --- */}
      {/* Эта форма видна ТОЛЬКО если `isAuthenticated` = true */}
      {isAuthenticated ? (
        <form onSubmit={handleAnswerSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Ваш Ответ</h2>
          <textarea
            value={newAnswerText}
            onChange={e => setNewAnswerText(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={8}
            placeholder="Напишите свой ответ..."
            required
          />
          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmittingAnswer}
              className="inline-flex justify-center py-2 px-4 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmittingAnswer ? 'Отправка...' : 'Отправить ответ'}
            </button>
            {error && <p className="text-sm text-red-600 inline ml-4">{error}</p>}
          </div>
        </form>
      ) : (
        // --- ИЗМЕНЕНИЕ: ГОСТЕВОЙ РЕЖИМ ---
        // Показываем это гостям
        <div className="text-center p-4 border-t">
          <p>
            <a href="/login" className="text-indigo-600 font-semibold">
              Войдите
            </a>
            , чтобы оставить свой ответ.
          </p>
        </div>
      )}
    </div>
  );
}

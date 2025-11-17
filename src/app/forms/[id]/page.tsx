'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/AuthContext';
import { getQuestionById } from '@/services/questions.service';
import { createAnswer } from '@/services/answers.service';
import { QuestionWithDetails } from '@/types/question.types';
import { CreateAnswerDto, Answer } from '@/types/answer.types';

export default function QuestionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  const questionId = Number(params.id);

  const [question, setQuestion] = useState<QuestionWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newAnswerText, setNewAnswerText] = useState('');
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);

  useEffect(() => {
    if (!questionId) return;

    async function loadQuestionData() {
      try {
        setLoading(true);
        setError(null);

        const data = await getQuestionById(questionId);
        setQuestion(data);
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити питання. Можливо, воно не існує.');
      } finally {
        setLoading(false);
      }
    }

    void loadQuestionData();
  }, [questionId]);

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !question) {
      setError('Ви повинні увійти в систему, щоб відповідати.');
      return;
    }
    if (!newAnswerText.trim()) {
      setError('Відповідь не може бути порожньою.');
      return;
    }

    setIsSubmittingAnswer(true);
    setError(null);

    const answerDto: CreateAnswerDto = {
      answerText: newAnswerText,
      questionId: question.id,
      category: question.category,
    };

    try {
      const savedAnswer = await createAnswer(answerDto);

      setQuestion(prevQuestion => {
        if (!prevQuestion) return null;

        return {
          ...prevQuestion,
          answers: [...prevQuestion.answers, savedAnswer],
        };
      });
      setNewAnswerText('');
    } catch (err) {
      console.error(err);
      setError('Не вдалося надіслати відповідь.');
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  if (loading || authLoading) {
    return <div className="container mx-auto p-4 text-center">Завантаження...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Помилка</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">Питання не знайдено</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex">
          <div className="flex flex-col items-center mr-4 w-12">
            <button className="text-gray-400 hover:text-indigo-600">▲</button>
            <span className="text-2xl font-bold">{question.likes}</span>
            <button className="text-gray-400 hover:text-indigo-600">▼</button>
          </div>

          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-4">{question.questionName}</h1>
            <p className="text-gray-800 whitespace-pre-wrap mb-4">{question.questionText}</p>]
            <div className="text-sm text-gray-500">
              <span className="mr-2">Категорія: {question.category}</span>
              <span>
                Задано: {new Date(question.createdAt).toLocaleString()}
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

      <h2 className="text-2xl font-bold mb-4">
        {question.answers.length} {question.answers.length === 1 ? 'Відповідь' : 'Відповідей'}
      </h2>

      <div className="space-y-6 mb-8">
        {question.answers.map((answer: Answer) => (
          <div key={answer.id} className="bg-white p-6 rounded-lg shadow-sm flex">
            <div className="flex flex-col items-center mr-4 w-12">
              <button className="text-gray-400 hover:text-indigo-600">▲</button>
              <span className="text-xl font-bold">{answer.likes}</span>
              <button className="text-gray-400 hover:text-indigo-600">▼</button>
            </div>

            <div className="flex-grow">
              <p className="text-gray-800 whitespace-pre-wrap">{answer.answerText}</p>
              <div className="text-sm text-gray-500 mt-4">
                Відповів: (ID користувача {answer.userid})
                {new Date(answer.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        {question.answers.length === 0 && (
          <p className="text-gray-500">На це питання ще немає відповідей. Станьте першим!</p>
        )}
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleAnswerSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Ваша Відповідь</h2>
          <textarea
            value={newAnswerText}
            onChange={e => setNewAnswerText(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={8}
            placeholder="Напишіть свою відповідь..."
            required
          />
          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmittingAnswer}
              className="inline-flex justify-center py-2 px-4 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmittingAnswer ? 'Відправлення...' : 'Надіслати відповідь'}
            </button>
            {error && <p className="text-sm text-red-600 inline ml-4">{error}</p>}
          </div>
        </form>
      ) : (
        <div className="text-center p-4 border-t">
          <p>
            <a href="/login" className="text-indigo-600 font-semibold">
              Увійдіть
            </a>
            , щоб залишити свою відповідь.
          </p>
        </div>
      )}
    </div>
  );
}

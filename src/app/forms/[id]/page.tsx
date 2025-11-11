'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getFormById, getFormQuestions, submitFormResponse } from '@/services/forms.service';

// --- Шаг 1: ИМПОРТИРУЕМ "НАСТОЯЩИЕ" ТИПЫ ---
// Мы импортируем Question и QuestionOption напрямую из form.types.ts,
// где, как мы договорились, они уже обновлены.
import {
  Form,
  Answer,
  Question, // Используем "настоящий" тип
  QuestionOption, // И этот
} from '@/types/form.types';
import { SubmitResponseDto } from '@/types/response.types';

// --- Компонент-страница ---
export default function FormTakePage() {
  // --- Шаг 2: Хуки ---
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const formId = Number(params.id);

  // --- Шаг 3: Состояние (State) ---
  const [form, setForm] = useState<Form | null>(null);

  // <-- БЕЗ ХАКОВ: Используем "настоящий" импортированный тип Question
  const [questions, setQuestions] = useState<Question[]>([]);

  const [answers, setAnswers] = useState<Answer[]>([]);

  // Состояния UI
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // --- Шаг 4: Загрузка данных (чистая версия) ---
  useEffect(() => {
    if (!formId || authLoading) return;

    if (!user) {
      setError('Пожалуйста, войдите в систему, чтобы пройти эту форму.');
      setLoading(false);
      return;
    }

    async function loadFormData() {
      try {
        setLoading(true);
        setError(null);

        // Загружаем последовательно, чтобы избежать ошибок TypeScript с Promise.all
        const formDetails = await getFormById(formId);

        // getFormQuestions теперь возвращает Promise<Question[]>,
        // где Question УЖЕ содержит `options: QuestionOption[]`
        const formQuestions = await getFormQuestions(formId);

        setForm(formDetails);

        // <-- БЕЗ ХАКОВ: Просто сохраняем данные как есть
        setQuestions(formQuestions);

        // Инициализация состояния ответов
        const initialAnswers = formQuestions.map(q => ({
          questionId: q.id,
          value: q.type === 'multiple' ? [] : '',
        }));
        setAnswers(initialAnswers);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить форму. Возможно, она не существует.');
      } finally {
        setLoading(false);
      }
    }

    // `void` убирает ошибку линтера "Promise returned..."
    void loadFormData();
  }, [formId, user, authLoading]);

  // --- Шаг 5: Обработчик изменения ответов ---
  // (Без изменений)
  const handleAnswerChange = useCallback((questionId: number, value: string | string[]) => {
    setAnswers(currentAnswers =>
      currentAnswers.map(ans => (ans.questionId === questionId ? { ...ans, value } : ans)),
    );
  }, []);

  // --- Шаг 6: Отправка формы ---
  // (Без изменений, валидация теперь работает "по-настоящему")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Вы должны быть авторизованы для отправки.');
      return;
    }

    setSubmitting(true);
    setError(null);

    // Валидация
    for (const question of questions) {
      // `question` теперь "настоящего" типа Question
      if (question.required) {
        const answer = answers.find(a => a.questionId === question.id);
        if (
          !answer ||
          (question.type === 'multiple' && (answer.value as string[]).length === 0) ||
          (question.type !== 'multiple' && !answer.value)
        ) {
          setError(`Вопрос "${question.text}" является обязательным.`);
          setSubmitting(false);
          return;
        }
      }
    }

    try {
      const submissionDto: SubmitResponseDto = { formId, answers };
      await submitFormResponse(submissionDto);
      setSuccess(true);
      setTimeout(() => {
        router.push('/forms/list');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Не удалось отправить ответы. Попробуйте снова.');
    } finally {
      setSubmitting(false);
    }
  };

  // --- Шаг 7: Рендеринг (JSX) ---
  // (Без изменений)
  if (authLoading || loading) {
    return <div className="container mx-auto p-4 text-center">Загрузка...</div>;
  }

  if (success) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-green-600">Спасибо!</h1>
        <p>Ваши ответы успешно отправлены.</p>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Ошибка</h1>
        <p>{error || 'Форма не найдена.'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
        <p className="text-gray-700 mb-6">{form.description}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions
            .sort((a, b) => a.order - b.order)
            .map(question => {
              // `question` - "настоящий" Question
              const currentAnswer = answers.find(a => a.questionId === question.id);

              return (
                <QuestionRenderer
                  key={question.id}
                  question={question} // Передаем "настоящий" Question
                  value={currentAnswer?.value}
                  onChange={value => handleAnswerChange(question.id, value)}
                />
              );
            })}

          <div className="pt-4 border-t">
            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 px-4 rounded-md text-white font-semibold
                         bg-indigo-600 hover:bg-indigo-700
                         disabled:bg-gray-400"
            >
              {submitting ? 'Отправка...' : 'Отправить ответы'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Шаг 8: Вспомогательный компонент для рендера вопросов ---

type QuestionRendererProps = {
  question: Question; // <-- БЕЗ ХАКОВ: Используем "настоящий" Question
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
};

function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  const label = (
    <label className="block text-lg font-semibold text-gray-800 mb-2">
      {question.text}
      {question.required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  switch (question.type) {
    case 'text':
      return (
        <div className="p-4 border rounded-lg">
          {label}
          <textarea
            value={(value as string) || ''}
            onChange={e => onChange(e.target.value)}
            required={question.required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
            placeholder="Ваш ответ..."
          />
        </div>
      );

    case 'single':
      return (
        <div className="p-4 border rounded-lg">
          {label}
          <div className="space-y-2 mt-2">
            {/* Теперь `question.options` существует "по-настоящему" */}
            {question.options.map(option => (
              <label key={option.id} className="flex items-center p-2 rounded hover:bg-gray-50">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.text}
                  checked={value === option.text}
                  onChange={e => onChange(e.target.value)}
                  required={question.required}
                  className="h-4 w-4 text-indigo-600 border-gray-300
                             focus:ring-indigo-500"
                />
                <span className="ml-3 text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        </div>
      );

    case 'multiple':
      const currentValue = (value as string[]) || [];

      const handleCheckboxChange = (optionText: string) => {
        let newValue: string[];
        if (currentValue.includes(optionText)) {
          newValue = currentValue.filter(v => v !== optionText);
        } else {
          newValue = [...currentValue, optionText];
        }
        onChange(newValue);
      };

      return (
        <div className="p-4 border rounded-lg">
          {label}
          <div className="space-y-2 mt-2">
            {/* Теперь `question.options` существует "по-настоящему" */}
            {question.options.map(option => (
              <label key={option.id} className="flex items-center p-2 rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  value={option.text}
                  checked={currentValue.includes(option.text)}
                  onChange={() => handleCheckboxChange(option.text)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded
                             focus:ring-indigo-500"
                />
                <span className="ml-3 text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

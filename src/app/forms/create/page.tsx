'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/AuthContext';
import { createForm } from '@/services/forms.service';

// --- ИЗМЕНЕНИЕ: Импортируем "настоящие" DTO ---
import { CreateFormDto } from '@/types/form.types';

type QuestionType = 'single' | 'multiple' | 'text';

// (Эти локальные UI-типы в порядке, они нужны для tempId)
interface QuestionOptionUI {
  tempId: string;
  text: string;
}

interface QuestionUI {
  tempId: string;
  text: string;
  type: QuestionType;
  required: boolean;
  options: QuestionOptionUI[];
}

// --- ИЗМЕНЕНИЕ: Локальный интерфейс CreateFormWithQuestionsDto УДАЛЕН ---

const generateTempId = () => `temp_${Math.random().toString(36).substr(2, 9)}`;

export default function CreateFormPage() {
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [questions, setQuestions] = useState<QuestionUI[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addQuestion = () => {
    const newQuestion: QuestionUI = {
      tempId: generateTempId(),
      text: '',
      type: 'text',
      required: false,
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (tempId: string) => {
    setQuestions(questions.filter(q => q.tempId !== tempId));
  };

  const updateQuestion = (tempId: string, field: keyof QuestionUI, value: any) => {
    setQuestions(
      questions.map(q => {
        if (q.tempId === tempId) {
          if (field === 'type' && value === 'text') {
            return { ...q, [field]: value, options: [] };
          }
          return { ...q, [field]: value };
        }
        return q;
      }),
    );
  };

  const addOption = (questionTempId: string) => {
    const newOption: QuestionOptionUI = {
      tempId: generateTempId(),
      text: '',
    };
    setQuestions(
      questions.map(q =>
        q.tempId === questionTempId ? { ...q, options: [...q.options, newOption] } : q,
      ),
    );
  };

  const removeOption = (questionTempId: string, optionTempId: string) => {
    setQuestions(
      questions.map(q =>
        q.tempId === questionTempId
          ? { ...q, options: q.options.filter(opt => opt.tempId !== optionTempId) }
          : q,
      ),
    );
  };

  const updateOptionText = (questionTempId: string, optionTempId: string, text: string) => {
    setQuestions(
      questions.map(q =>
        q.tempId === questionTempId
          ? {
              ...q,
              options: q.options.map(opt => (opt.tempId === optionTempId ? { ...opt, text } : opt)),
            }
          : q,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || questions.length === 0) {
      setError('Название и хотя бы один вопрос обязательны.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // --- ИЗМЕНЕНИЕ: Используем "настоящий" CreateFormDto и добавляем 'order' ---
    const createDto: CreateFormDto = {
      title,
      description,
      categoryId,
      questions: questions.map((q, qIndex) => ({
        // Добавили qIndex
        text: q.text,
        type: q.type,
        required: q.required,
        order: qIndex + 1, // ⬅️⬅️ ВОТ ИСПРАВЛЕНИЕ
        options: q.options.map(opt => ({ text: opt.text })),
      })),
    };

    try {
      console.log('Отправка на бэкенд:', createDto);

      // Теперь createDto имеет тип CreateFormDto, и createForm примет его без ошибки
      await createForm(createDto);

      router.push('/forms/list');
    } catch (err) {
      console.error(err);
      setError('Не удалось создать форму. Проблема с API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Доступ запрещен</h1>
        <p>Пожалуйста, войдите в систему, чтобы создавать формы.</p>
      </div>
    );
  }

  // --- (Остальной JSX-код остается без изменений) ---
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Создание новой формы</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Блок 1: Информация о форме */}
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <label className="block text-sm font-medium text-gray-700">
            Название формы
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Описание
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={3}
            />
          </label>
          {/* Поле для CategoryId. В будущем это может быть <select> */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            ID Категории (временно)
            <input
              type="number"
              value={categoryId}
              onChange={e => setCategoryId(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
        </div>

        {/* Блок 2: Вопросы */}
        <h2 className="text-2xl font-semibold pt-4">Вопросы</h2>
        <div className="space-y-4">
          {questions.map((q, qIndex) => (
            <div key={q.tempId} className="p-4 border rounded-lg shadow-sm bg-white relative">
              <button
                type="button"
                onClick={() => removeQuestion(q.tempId)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xl"
              >
                &times;
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-gray-700">
                  Текст вопроса
                  <input
                    type="text"
                    value={q.text}
                    onChange={e => updateQuestion(q.tempId, 'text', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    placeholder={`Вопрос #${qIndex + 1}`}
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                  Тип вопроса (из form.types.ts)
                  <select
                    value={q.type}
                    onChange={e => updateQuestion(q.tempId, 'type', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="text">Текстовый ответ</option>
                    <option value="single">Один из списка</option>
                    <option value="multiple">Несколько из списка</option>
                  </select>
                </label>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={q.required}
                    onChange={e => updateQuestion(q.tempId, 'required', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Обязательный вопрос</span>
                </label>
              </div>

              {/* Блок 3: Опции (если тип вопроса не 'text') */}
              {(q.type === 'single' || q.type === 'multiple') && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Варианты ответа:</h4>
                  <div className="space-y-2">
                    {q.options.map(opt => (
                      <div key={opt.tempId} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={opt.text}
                          onChange={e => updateOptionText(q.tempId, opt.tempId, e.target.value)}
                          className="block w-full sm:text-sm rounded-md border-gray-300 shadow-sm"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(q.tempId, opt.tempId)}
                          className="text-red-500 hover:text-red-700 text-lg"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addOption(q.tempId)}
                    className="mt-3 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    + Добавить вариант
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="w-full py-2 px-4 border border-dashed rounded-lg text-gray-600 hover:bg-gray-50"
        >
          + Добавить вопрос
        </button>

        {/* Блок 4: Отправка */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={isSubmitting || authLoading}
            className="inline-flex justify-center py-2 px-4 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Сохранение...' : 'Создать форму'}
          </button>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
}

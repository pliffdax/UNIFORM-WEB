// @ts-nocheck
// src/types/form.types.ts

// Форма (опросник/тест)
export interface Form {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  createdBy: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------------
// ⬇️ ⬇️ ⬇️ НАЧНИ ИЗМЕНЕНИЯ ОТСЮДА ⬇️ ⬇️ ⬇️
// -----------------------------------------------------------------

// 1. ДОБАВЬ ЭТОТ ИНТЕРФЕЙС
// Вариант ответа (для 'single' / 'multiple')
export interface QuestionOption {
  id: number; // ID варианта ответа (из БД)
  text: string;
}

// 2. ИЗМЕНИ `Question`
// Вопрос
export interface Question {
  id: number;
  formId: number;
  text: string;
  type: 'single' | 'multiple' | 'text'; // тип вопроса
  order: number;
  required: boolean;
  options: QuestionOption[]; // ⬅️⬅️ ДОБАВЛЕНО ЭТО ПОЛЕ
}

// 3. ДОБАВЬ ЭТИ ТИПЫ ДЛЯ DTO
// DTO для создания варианта ответа (без id)
export interface CreateOptionDto {
  text: string;
}

// DTO для создания вопроса (без id и formId)
export interface CreateQuestionDto {
  text: string;
  type: 'single' | 'multiple' | 'text';
  order: number;
  required: boolean;
  options: CreateOptionDto[]; // Массив DTO для опций
}

// 4. ИЗМЕНИ `CreateFormDto`
// DTO для создания формы
export interface CreateFormDto {
  title: string;
  description: string;
  categoryId: number;
  questions: CreateQuestionDto[]; // ⬅️⬅️ ДОБАВЛЕНО ЭТО ПОЛЕ
}

// -----------------------------------------------------------------
// ⬆️ ⬆️ ⬆️ КОНЕЦ ИЗМЕНЕНИЙ ⬆️ ⬆️ ⬆️
// -----------------------------------------------------------------

// Ответ пользователя
export interface Answer {
  questionId: number;
  value: string | string[]; // текст или массив выборов
}

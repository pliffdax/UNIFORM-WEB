import { apiClient } from '@/lib/api/client';
import { Form, CreateFormDto, Question } from '@/types/form.types';
import { SubmitResponseDto } from '@/types/response.types';

// Получить все формы
export async function getAllForms(): Promise<Form[]> {
  return apiClient<Form[]>('/forms');
}

// Получить форму по ID
export async function getFormById(id: number): Promise<Form> {
  return apiClient<Form>(`/forms/${id}`);
}

// Создать форму
export async function createForm(data: CreateFormDto): Promise<Form> {
  return apiClient<Form>('/forms', {
    method: 'POST',
    body: data,
  });
}

// Получить вопросы формы
export async function getFormQuestions(formId: number): Promise<Question[]> {
  return apiClient<Question[]>(`/forms/${formId}/questions`);
}

// Отправить ответы на форму
export async function submitFormResponse({ formId, answers }: SubmitResponseDto): Promise<void> {
  return apiClient(`/responses`, {
    method: 'POST',
    body: {
      formId,
      answers,
    },
  });
}

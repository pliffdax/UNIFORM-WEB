import { apiClient } from '@/lib/api/client';
import { Form, CreateFormDto, Question } from '@/types/form.types';
import { SubmitResponseDto } from '@/types/response.types';

export async function getAllForms(): Promise<Form[]> {
  return apiClient<Form[]>('/forms');
}

export async function getFormById(id: number): Promise<Form> {
  return apiClient<Form>(`/forms/${id}`);
}

export async function createForm(data: CreateFormDto): Promise<Form> {
  return apiClient<Form>('/forms', {
    method: 'POST',
    body: data,
  });
}

export async function getFormQuestions(formId: number): Promise<Question[]> {
  return apiClient<Question[]>(`/forms/${formId}/questions`);
}

export async function submitFormResponse({ formId, answers }: SubmitResponseDto): Promise<void> {
  return apiClient(`/responses`, {
    method: 'POST',
    body: {
      formId,
      answers,
    },
  });
}

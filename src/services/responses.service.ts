import { apiClient } from '@/lib/api/client';
import { FullFormResponse } from '@/types/response.types';

/**
 * Получить все ответы (submissions) для конкретной формы.
 * Это может быть полезно для владельца формы (админа).
 */
export async function getResponsesForForm(formId: number): Promise<FullFormResponse[]> {
  return apiClient<FullFormResponse[]>(`/responses/form/${formId}`);
}

/**
 * Получить конкретный ответ (submission) по его ID.
 */
export async function getResponseById(responseId: number): Promise<FullFormResponse> {
  return apiClient<FullFormResponse>(`/responses/${responseId}`);
}

/**
 * Получить все ответы (submissions), отправленные текущим пользователем.
 */
export async function getMyResponses(): Promise<FullFormResponse[]> {
  // apiClient по умолчанию 'requiresAuth = true',
  // поэтому токен пользователя будет автоматически прикреплен.
  return apiClient<FullFormResponse[]>(`/responses/my`);
}

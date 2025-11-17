import { apiClient } from '@/lib/api/client';
import { FullFormResponse } from '@/types/response.types';

export async function getResponsesForForm(formId: number): Promise<FullFormResponse[]> {
  return apiClient<FullFormResponse[]>(`/responses/form/${formId}`);
}

export async function getResponseById(responseId: number): Promise<FullFormResponse> {
  return apiClient<FullFormResponse>(`/responses/${responseId}`);
}

export async function getMyResponses(): Promise<FullFormResponse[]> {
  return apiClient<FullFormResponse[]>(`/responses/my`);
}

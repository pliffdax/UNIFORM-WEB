import { Answer } from './form.types';

export interface SubmitResponseDto {
  formId: number;
  answers: Answer[];
}

export interface FullFormResponse {
  id: number;
  formId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
}

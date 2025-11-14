// @ts-nocheck
import { Answer } from './form.types';

/**
 * DTO для отправки (создания) набора ответов на форму.
 * Это то, что мы отправляем на сервер.
 */
export interface SubmitResponseDto {
  formId: number;
  answers: Answer[];
}

/**
 * Полный объект ответа (submission), который мы получаем от сервера.
 * Представляет одну завершенную сессию ответа на форму.
 */
export interface FullFormResponse {
  id: number;
  formId: number;
  userId: number; // ID пользователя, который ответил (предположение)
  createdAt: string;
  updatedAt: string;
  answers: Answer[]; // Массив предоставленных ответов
}

import { apiClient } from '@/lib/api/client';
// Используем ТВОИ типы из answer.types.ts
import { Answer, CreateAnswerDto } from '@/types/answer.types';

/**
 * Отправляет новый ответ на сервер
 */
export async function createAnswer(data: CreateAnswerDto): Promise<Answer> {
  // Мы предполагаем, что твой API принимает POST-запрос на /answers
  return apiClient<Answer>('/answers', {
    method: 'POST',
    body: data,
  });
}

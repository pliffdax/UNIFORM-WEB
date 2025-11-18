import { apiClient } from '@/lib/api/client';
import { Answer, CreateAnswerDto } from '@/types/answer.types';

export async function createAnswer(data: CreateAnswerDto): Promise<Answer> {
  return apiClient<Answer>('/answers', {
    method: 'POST',
    body: data,
  });
}

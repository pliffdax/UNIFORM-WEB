import { apiClient } from '@/lib/api/client';
import {
  Question,
  QuestionWithDetails,
  CreateQuestionDto,
  UpdateQuestionDto,
} from '@/types/question.types';

// Получить ВСЕ вопросы (для списка)
export async function getAllQuestions(): Promise<Question[]> {
  // Мы предполагаем, что твой API отдает список вопросов по этому эндпоинту
  return apiClient<Question[]>('/questions');
}

// Получить ОДИН вопрос (для страницы просмотра)
export async function getQuestionById(id: number): Promise<QuestionWithDetails> {
  return apiClient<QuestionWithDetails>(`/questions/${id}`);
}

// Создать вопрос
export async function createQuestion(data: CreateQuestionDto): Promise<Question> {
  return apiClient<Question>('/questions', {
    method: 'POST',
    body: data,
  });
}

// (Может понадобиться в будущем)
// Обновить вопрос
export async function updateQuestion(id: number, data: UpdateQuestionDto): Promise<Question> {
  return apiClient<Question>(`/questions/${id}`, {
    method: 'PUT', // или 'PUT'
    body: data,
  });
}

import { apiClient } from '@/lib/api/client';
import {
  Question,
  QuestionWithDetails,
  CreateQuestionDto,
  UpdateQuestionDto,
} from '@/types/question.types';

export async function getAllQuestions(): Promise<Question[]> {
  return apiClient<Question[]>('/questions');
}

export async function getQuestionById(id: number): Promise<QuestionWithDetails> {
  return apiClient<QuestionWithDetails>(`/questions/${id}`);
}

export async function createQuestion(data: CreateQuestionDto): Promise<Question> {
  return apiClient<Question>('/questions', {
    method: 'POST',
    body: data,
  });
}

export async function updateQuestion(id: number, data: UpdateQuestionDto): Promise<Question> {
  return apiClient<Question>(`/questions/${id}`, {
    method: 'PUT', // или 'PUT'
    body: data,
  });
}

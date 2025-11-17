import { User } from './auth.types';
import { Answer } from './answer.types';

export interface Question {
  id: number;
  questionName: string;
  questionText: string;
  likes: number;
  shareUrl: string | null;
  status: string;
  userid: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionWithDetails extends Question {
  answers: Answer[];
  user: User;
}

export interface CreateQuestionDto {
  questionName: string;
  questionText: string;
  category: string;
  status: string;
  userid: string;
}

export interface UpdateQuestionDto {
  questionName?: string;
  questionText?: string;
  category?: string;
  status?: string;
  userid: string;
}

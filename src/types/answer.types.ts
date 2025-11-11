import { User } from './auth.types';

export interface Answer {
  id: number;
  answerText: string;
  likes: number;
  shareUrl: string | null;
  acceptedAnswer: boolean;
  userid: string;
  questionid: number;
  createdAt: string;
  updatedAt: string;
}

export interface AnswerWithUser extends Answer {
  user: User;
}

export interface CreateAnswerDto {
  answerText: string;
  questionId: number;
  category: string;
}

export interface UpdateAnswerDto {
  answerText?: string;
  category?: string;
}

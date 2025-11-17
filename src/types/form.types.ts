export interface Form {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  createdBy: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionOption {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  formId: number;
  text: string;
  type: 'single' | 'multiple' | 'text';
  order: number;
  required: boolean;
  options: QuestionOption[];
}

export interface CreateOptionDto {
  text: string;
}

export interface CreateQuestionDto {
  text: string;
  type: 'single' | 'multiple' | 'text';
  order: number;
  required: boolean;
  options: CreateOptionDto[];
}

export interface CreateFormDto {
  title: string;
  description: string;
  categoryId: number;
  questions: CreateQuestionDto[];
}

export interface Answer {
  questionId: number;
  value: string | string[];
}

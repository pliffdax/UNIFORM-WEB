import { apiClient } from '@/lib/api/client';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/category.types';

export async function getAllCategories(): Promise<Category[]> {
  return apiClient<Category[]>('/categories');
}

export async function getCategoryById(id: number): Promise<Category> {
  return apiClient<Category>(`/categories/${id}`);
}

export async function createCategory(data: CreateCategoryDto): Promise<Category> {
  return apiClient<Category>('/categories', {
    method: 'POST',
    body: data,
  });
}

export async function updateCategory(id: number, data: UpdateCategoryDto): Promise<Category> {
  return apiClient<Category>(`/categories/${id}`, {
    method: 'PATCH',
    body: data,
  });
}

export async function deleteCategory(id: number): Promise<void> {
  await apiClient<void>(`/categories/${id}`, {
    method: 'DELETE',
  });
}

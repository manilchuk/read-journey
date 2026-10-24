import { api } from './api';
import type { Book, FiltersParams, RecommendedResponse } from '@/types';

export const getRecommendedBooks = async (
  params: FiltersParams
): Promise<RecommendedResponse> => {
  const response = await api.get<RecommendedResponse>('/books/recommend', {
    params,
  });
  return response.data;
};

export const getOwnBooks = async (status?: string): Promise<Book[]> => {
  const response = await api.get<Book[]>('/books/own', { params: { status } });
  return response.data;
};

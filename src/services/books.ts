// src/services/books.ts

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

// Додати книгу з recommended у власну бібліотеку
export const addRecommendedBook = async (id: string): Promise<Book> => {
  const response = await api.post<Book>(`/books/add/${id}`);
  return response.data;
};

// Додати власну книгу (з форми AddBook)
export const addBook = async (data: {
  title: string;
  author: string;
  totalPages: number;
}): Promise<Book> => {
  const response = await api.post<Book>('/books/add', data);
  return response.data;
};

// Видалити книгу з бібліотеки
export const removeBook = async (id: string): Promise<void> => {
  await api.delete(`/books/remove/${id}`);
};

export const getBookById = async (id: string): Promise<Book> => {
  const response = await api.get<Book>(`/books/${id}`);
  return response.data;
};

export const startReading = async (id: string, page: number): Promise<Book> => {
  const response = await api.post<Book>('/books/reading/start', { id, page });
  return response.data;
};

export const stopReading = async (id: string, page: number): Promise<Book> => {
  const response = await api.post<Book>('/books/reading/finish', { id, page });
  return response.data;
};

export const deleteReading = async (
  bookId: string,
  readingId: string
): Promise<Book> => {
  const response = await api.delete<Book>('/books/reading', {
    params: { bookId, readingId },
  });
  return response.data;
};

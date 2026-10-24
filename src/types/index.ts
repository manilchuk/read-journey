export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface AuthResponse {
  email: string;
  name: string;
  token: string;
  refreshToken: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export type BookStatus = 'unread' | 'in-progress' | 'done';

export interface ReadingProgress {
  startPage: number;
  startReading: string;
  finishPage?: number;
  finishReading?: string;
  speed?: number;
  status: 'active' | 'inactive';
}

export interface TimeLeftToRead {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: BookStatus;
  owner: string;
  progress: ReadingProgress[];
  timeLeftToRead?: TimeLeftToRead;
}

export interface RecommendedBook {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}

export interface RecommendedResponse {
  results: RecommendedBook[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface AddBookPayload {
  title: string;
  author: string;
  totalPages: number;
}

export interface ReadingPayload {
  id: string;
  page: number;
}

export interface FiltersParams {
  title?: string;
  author?: string;
  page?: number;
  limit?: number;
}

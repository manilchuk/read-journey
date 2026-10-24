import { api } from './api';
import type {
  AuthResponse,
  SignInCredentials,
  SignUpCredentials,
  User,
} from '@/types';

export const signUp = async (
  data: SignUpCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/users/signup', data);
  return response.data;
};

export const signIn = async (
  data: SignInCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/users/signin', data);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/users/current');
  return response.data;
};

export const signOut = async (): Promise<void> => {
  await api.post('/users/signout');
};

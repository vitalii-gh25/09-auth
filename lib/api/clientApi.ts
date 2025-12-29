// lib/api/clientApi.ts

import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { nextServer } from './api';

// -------- NOTES --------
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag = '',
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const res = await nextServer.post<Note>('/notes', note);
  return res.data;
};
// export const createNote = async (note: {
//   title: string;
//   content: string;
//   tag: string;
// }): Promise<Note> => {
//   const { data } = await nextServer.post<Note>('/notes', note);
//   return data;
// };

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

// -------- AUTH --------

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export interface RegisterData {
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
  avatar?: string;
  email?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await nextServer.post('/upload', formData);
  return data.url;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

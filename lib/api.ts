// lib/api.ts
import axios from 'axios';
import type { Note } from '@/types/note';

const API_BASE = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// Глобальна база
axios.defaults.baseURL = API_BASE;

// Глобальний заголовок з токеном (якщо є)
if (TOKEN) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
  sortBy?: 'created' | 'updated';
  signal?: AbortSignal;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
  sortBy,
  signal,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag, sortBy },
    signal,
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', note);
  console.log('API createNote response:', data);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};

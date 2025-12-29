// lib/api/serverApi.ts
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { cookies } from 'next/headers';
import { nextServer } from './api';

// Заметка по серверным функциям
export const fetchNotes = async (cookieHeader: string) => {
  const { data } = await nextServer.get<Note[]>('/notes', {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const fetchNoteById = async (id: string, cookieHeader: string) => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    // <-- поправил путь
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};

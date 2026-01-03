// lib/api/serverApi.ts
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { cookies } from 'next/headers';
import { nextServer } from './api';

// Отримання всіх нотаток (кукі беруться всередині)
export const fetchNotes = async (): Promise<Note[]> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note[]>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

// Отримання нотатки по id (кукі беруться всередині)
export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

// Отримання профілю користувача
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

// Перевірка сесії — повертаємо повний Axios response
export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

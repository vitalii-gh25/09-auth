// lib/api/serverApi.ts
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { cookies } from 'next/headers';
import { nextServer } from './api';

export const fetchNotes = async (): Promise<Note[]> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note[]>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

// components/NoteForm/NoteForm.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNoteStore } from '@/lib/store/noteStore';
import { nextServer } from '@/lib/api/api';
import css from './NoteForm.module.css';

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: string;
}

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (note: CreateNoteDto) => {
      await nextServer.post('/notes', note); // отправка с куками
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] }); // обновляем кеш заметок
      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(draft);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
          disabled={isPending}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={6}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
          maxLength={500}
          disabled={isPending}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
          required
          disabled={isPending}
        >
          <option value="">Select tag</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {isError && (
        <p className={css.error}>Error creating note. Please try again.</p>
      )}

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Saving...' : 'Create Note'}
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

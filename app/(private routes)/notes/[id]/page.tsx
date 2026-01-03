// app/(private routes)/notes/[id]/page.tsx

import { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
// ⚠️ Змінено імпорт: для серверного компоненту використовуємо serverApi
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from '@/app/(private routes)/notes/[id]/NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

// Генерація метаданих для SEO та OpenGraph
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id); // Використовуємо серверну функцію

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://notehub.com/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'article',
    },
  };
}

// Серверний компонент сторінки нотатки
const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  // ⚠️ Використовуємо серверну функцію fetchNoteById
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;

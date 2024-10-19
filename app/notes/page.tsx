'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useNotesQuery } from '@/hooks/notes/useNotesQuery';
import { queryClient } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle, NotebookPen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NotesPage() {
  const [title, setTitle] = useState('');

  const { data: notes } = useNotesQuery();

  const createNoteMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      const { success, message } = await (
        await fetch('/api/notes', {
          method: 'POST',
          body: JSON.stringify({
            title: title,
          }),
        })
      ).json();

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        setTitle('');
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  return (
    <div className="container mt-12 flex flex-col space-y-5">
      <div className="flex justify-between space-x-4">
        <Input
          value={title}
          className="w-80"
          onChange={(event) => setTitle(event?.target.value)}
          placeholder="Add Note Title Here..."
        />
        <Button
          variant="outline"
          disabled={createNoteMutation.isPending}
          onClick={() => {
            if (title.length === 0) return toast.error('Title is required');
            createNoteMutation.mutate();
          }}
        >
          {createNoteMutation.isPending ? (
            <LoaderCircle className="mr-2 size-4 animate-spin" />
          ) : (
            <NotebookPen className="mr-2 size-4" />
          )}
          Create
        </Button>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes?.map((note) => (
              <TableRow key={note.id}>
                <TableCell className="font-medium">{note.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

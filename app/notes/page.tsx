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
import { useCreateNoteMutation } from '@/hooks/notes/useCreateNoteMutation';
import { useNotesQuery } from '@/hooks/notes/useNotesQuery';
import { queryClient } from '@/lib/utils';
import { LoaderCircle, NotebookPen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NotesPage() {
  const [title, setTitle] = useState('');

  const { data: notes } = useNotesQuery();
  const createNoteMutation = useCreateNoteMutation();

  const createNote = async () => {
    if (!title.length) return toast.error('Title is required');

    createNoteMutation.mutate(title, {
      onSuccess: async ({ message }: { message: string }) => {
        toast.success(message);
        setTitle('');

        await queryClient.invalidateQueries({
          queryKey: ['notes'],
        });
      },
    });
  };

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
          onClick={createNote}
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

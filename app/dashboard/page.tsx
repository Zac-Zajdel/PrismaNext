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
import { queryClient } from '@/lib/utils';
import { ApiResponse } from '@/types/apiHelpers';
import { Note } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoaderCircle, NotebookPen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Dashboard() {
  const [title, setTitle] = useState('');

  const { isLoading, data: notes } = useQuery({
    queryKey: ['notes'],
    queryFn: async (): Promise<Note[]> => {
      const { success, message, data }: ApiResponse<Note[]> = await (
        await fetch(`/api/notes`)
      ).json();

      if (!success) {
        toast.error(message);
        return [];
      }

      return data;
    },
  });

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

  const externalApiMutation = useMutation({
    mutationFn: async (formData: { name: string }): Promise<void> => {
      const { success, message, data } = await (
        await fetch('/api/tokens', {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
          }),
        })
      ).json();

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        toast.success(data);
      }
    },
  });

  return (
    <div className="container mt-12 flex flex-col space-y-5">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Input
            value={title}
            className="w-96"
            onChange={(event) => setTitle(event?.target.value)}
            placeholder="Add Note Title Here..."
          />
          <Button
            variant="outline"
            disabled={createNoteMutation.isPending}
            onClick={() => {
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
        <div className="">
          <Button
            variant="outline"
            disabled={externalApiMutation.isPending}
            onClick={() => {
              externalApiMutation.mutate({
                name: Math.random().toString(36).slice(2, 7),
              });
            }}
          >
            Create API Token
          </Button>
        </div>
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

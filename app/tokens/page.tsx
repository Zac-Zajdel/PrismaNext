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
import { ApiResponse } from '@/types/apiHelpers';
import { Note } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoaderCircle, NotebookPen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NotesPage() {
  const [tokenName, setTokenName] = useState('');

  const { data: notes } = useQuery({
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
      <div className="flex justify-between space-x-4">
        <Input
          value={tokenName}
          className="w-80"
          onChange={(event) => setTokenName(event?.target.value)}
          placeholder="Add Token Name Here..."
        />
        <Button
          variant="outline"
          disabled={externalApiMutation.isPending}
          onClick={() => {
            if (tokenName.length === 0)
              return toast.error('Token Name is required');
            externalApiMutation.mutate({
              name: Math.random().toString(36).slice(2, 7),
            });
          }}
        >
          {externalApiMutation.isPending ? (
            <LoaderCircle className="mr-2 size-4 animate-spin" />
          ) : (
            <NotebookPen className="mr-2 size-4" />
          )}
          Create API Token
        </Button>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
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

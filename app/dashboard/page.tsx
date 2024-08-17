'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Dashboard() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');

  const noteMutation = useMutation({
    mutationFn: createNote,
  });

  async function createNote() {
    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
      }),
    });

    const jsonData = await response.json();
    if (!jsonData.success) {
      toast.error(jsonData.message);
    } else {
      toast.success(jsonData.message);
      setTitle('');
    }
  }

  const externalApiMutation = useMutation({
    mutationFn: createExternalApiToken,
  });

  async function createExternalApiToken(formData: { name: string }): Promise<{
    success: boolean;
    message: string;
    data: any;
  }> {
    const response = await fetch('/api/tokens', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name,
      }),
    });

    const jsonData = await response.json();
    if (!jsonData.success) {
      toast.error(jsonData.message);
    } else {
      toast.success(jsonData.message);
      toast.success(jsonData.data);
    }

    return jsonData;
  }

  return (
    <div className="mt-24 flex flex-col items-center space-y-10">
      <div>ID: {session?.user?.id}</div>
      <div>Name: {session?.user?.name}</div>

      <Button
        variant="outline"
        onClick={() =>
          toast.success('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
          })
        }
      >
        Show Toast
      </Button>

      <div className="flex items-center space-x-4">
        <Input
          value={title}
          className="w-96"
          onChange={(event) => setTitle(event?.target.value)}
          placeholder="Add Note Title Here..."
        />
        <Button
          variant="outline"
          disabled={noteMutation.isPending}
          onClick={() => {
            noteMutation.mutate();
          }}
        >
          Create
        </Button>
      </div>

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
  );
}

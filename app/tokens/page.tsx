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
import { useCreateTokenMutation } from '@/hooks/tokens/useCreateTokenMutation';
import { useTokensQuery } from '@/hooks/tokens/useTokensQuery';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { queryClient } from '@/lib/utils';
import { CopyIcon, LoaderCircle, NotebookPen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NotesPage() {
  const copy = useCopyToClipboard();
  const { data: tokens } = useTokensQuery();
  const createTokenMutation = useCreateTokenMutation();

  const [tokenName, setTokenName] = useState('');

  const generateToken = async () => {
    if (!tokenName.length) return toast.error('You must supply a name.');

    createTokenMutation.mutate(tokenName, {
      onSuccess: async ({
        data,
        message,
      }: {
        data: string;
        message: string;
      }) => {
        toast.success(
          <div>
            <div className="pb-5">{message}</div>
            <div className="flex items-center justify-start">
              <Button
                variant="ghost"
                size={'sm'}
                className="cursor-pointer hover:bg-green-900/10"
                onClick={() =>
                  copy(data)
                    .then(() => toast.success('Copied to clipboard'))
                    .catch(() => toast.error('Failed to copy'))
                }
                style={{
                  color: 'var(--success-text)',
                  border: '1px solid var(--success-text)',
                }}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>

              <p className="ml-4">{data}</p>
            </div>
          </div>,
          {
            duration: 10000,
          },
        );

        setTokenName('');

        await queryClient.invalidateQueries({
          queryKey: ['tokens'],
        });
      },
    });
  };

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
          disabled={createTokenMutation.isPending}
          onClick={generateToken}
        >
          {createTokenMutation.isPending ? (
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
            {tokens?.map((token) => (
              <TableRow key={token.id}>
                <TableCell className="font-medium">{token.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

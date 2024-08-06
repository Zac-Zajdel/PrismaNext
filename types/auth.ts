import { NextRequest } from 'next/server';

export type AuthUser = {
  id: string;
  name: string | null | undefined;
  email: string | null | undefined;
};

export interface WithAuthManagerInterface {
  ({
    req,
    user,
    searchParams,
  }: {
    req: NextRequest;
    user: AuthUser;
    searchParams: URLSearchParams;
  }): Promise<Response>;
}

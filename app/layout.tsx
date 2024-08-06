import { ClientSessionProvider } from '@/components/providers/client-session-provider';
import { ReactQueryClientProvider } from '@/components/providers/react-query-client-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const META_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://www.prismanext.com';

export const metadata: Metadata = {
  metadataBase: new URL(META_URL),
  title: 'PrismaNext',
  description: 'A Batteries Included Template For Your Next Adventure',
  applicationName: 'PrismaNext',
  authors: [{ name: 'John Doe', url: 'https://www.johndoe.com/' }],
  keywords: ['Starter', 'Template', 'Next.js', 'Prisma'],
  openGraph: {
    title: 'PrismaNext',
    description: 'A Batteries Included Template For Your Next Adventure',
  },
  twitter: {
    title: 'PrismaNext',
    description: 'A Batteries Included Template For Your Next Adventure',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <ClientSessionProvider>
        <html
          lang="en"
          suppressHydrationWarning
        >
          <body
            className={cn(
              'min-h-screen bg-background font-sans antialiased',
              fontSans.variable,
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
              <Toaster
                richColors
                closeButton
                toastOptions={{
                  duration: 5000,
                }}
              />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </body>
        </html>
      </ClientSessionProvider>
    </ReactQueryClientProvider>
  );
}

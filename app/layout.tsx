import {Metadata} from 'next';
import './globals.css';
import {ReactQueryClientProvider} from './reactQueryProvider';

export const metadata: Metadata = {
  title: 'Logos',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <body>{children}</body>
      </ReactQueryClientProvider>
    </html>
  );
}

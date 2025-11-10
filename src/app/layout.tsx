import '../assets/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'Uniform Web',
  description: 'My Next.js project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

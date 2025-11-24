import '../assets/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { WebVitalsReporter } from '@/components/WebVitualsReporter';

export const metadata = {
  title: 'Uniform Web',
  description: 'My Next.js project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WebVitalsReporter />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
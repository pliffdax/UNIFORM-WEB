import Navbar from '@/components/Navbar/Navbar';
import Aside from '@/components/Aside/Aside';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Aside />
      {children}
      <main></main>
    </>
  );
}

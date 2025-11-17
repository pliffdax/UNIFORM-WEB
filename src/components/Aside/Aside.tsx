'use client';

import './Aside.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Aside() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const handleCreateClick = () => {
    if (isAuthenticated) {
      router.push('/forms/create');
    } else {
      router.push('/login');
    }
  };

  return (
    <aside className="aside">
      <nav className="aside-nav">
        <Link href="/main/popularQuestions" className="aside-nav-link">
          popular questions
        </Link>
        <Link href="/main/likedQuestions" className="aside-nav-link">
          liked questions
        </Link>
        <Link href="/main/Faculties" className="aside-nav-link">
          faculties
        </Link>
      </nav>

      {!authLoading && (
        <div className="aside-button-container">
          <button onClick={handleCreateClick} className="aside-button">
            Створити питання
          </button>
        </div>
      )}
    </aside>
  );
}

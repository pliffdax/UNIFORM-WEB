// @ts-nocheck
'use client'; // <-- ДОБАВЛЕНО: Превращает в Клиентский Компонент

import './Aside.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- ДОБАВЛЕНО: Для навигации
import { useAuth } from '@/contexts/AuthContext'; // <-- ДОБАВЛЕНО: Для проверки авторизации

export default function Aside() {
  const { isAuthenticated, loading: authLoading } = useAuth(); // <-- ДОБАВЛЕНО
  const router = useRouter(); // <-- ДОБАВЛЕНО

  // --- ДОБАВЛЕНО: Логика нажатия на кнопку ---
  const handleCreateClick = () => {
    if (isAuthenticated) {
      // Если вошел, идем на страницу создания (которую мы переделаем)
      router.push('/forms/create');
    } else {
      // Если не вошел, кидаем на логин
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

      {/* --- ⬇️ ВОТ ИЗМЕНЕНИЕ ⬇️ --- */}
      {/* Не показываем кнопку, пока auth-контекст не загрузился */}
      {!authLoading && (
        <div className="aside-button-container">
          <button onClick={handleCreateClick} className="aside-button">
            Создать вопрос
          </button>
        </div>
      )}
      {/* --- ⬆️ КОНЕЦ ИЗМЕНЕНИЯ ⬆️ --- */}
    </aside>
  );
}

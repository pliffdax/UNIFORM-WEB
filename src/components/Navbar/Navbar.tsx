'use client';

import Link from 'next/link';
import './Navbar.css';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/main" className="navbar-logo">
          Uniform Web
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link href="/main">Главная</Link>
          </li>
          <li>
            <Link href="/forms/list">Вопросы</Link>
          </li>
          {isAuthenticated && (
            <>
              {/* --- ⬇️ ВОТ ИЗМЕНЕНИЕ ⬇️ --- */}
              {/* Теперь ссылка "Вопросы" ведет на /forms/list,
                которую мы переделаем в список вопросов
              */}

              {/* --- ⬆️ КОНЕЦ ИЗМЕНЕНИЯ ⬆️ --- */}
              <li>
                <Link href="/main/profile">Профиль</Link>
              </li>
            </>
          )}
        </ul>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <span style={{ marginRight: '15px' }}>Привет, {user?.username}!</span>
              <button onClick={logout} className="navbar-button">
                Выйти
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="navbar-button">Войти</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

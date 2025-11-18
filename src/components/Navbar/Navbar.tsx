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
            <Link href="/main">Головна</Link>
          </li>
          <li>
            <Link href="/forms/list">Питання</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link href="/main/profile">Профіль</Link>
              </li>
            </>
          )}
        </ul>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <span style={{ marginRight: '15px' }}>Привіт, {user?.username}!</span>
              <button onClick={logout} className="navbar-button">
                Вийти
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="navbar-button">Увійти</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

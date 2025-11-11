'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import './page.css';

export default function LoginPage() {
  const router = useRouter();
  const { login: setAuthUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('=== НАЧАЛО ЛОГИНА ===');
    console.log('Email:', email);
    console.log('Password length:', password.length);

    try {
      console.log('Отправляю запрос на логин...');
      const response = await login({ email, password });
      console.log('✅ Успешный ответ:', response);

      setAuthUser(response.user);
      router.push('/main');
    } catch (err) {
      console.error('❌ ОШИБКА:', err);
      console.error('❌ Тип ошибки:', typeof err);
      console.error('❌ Детали:', JSON.stringify(err, null, 2));

      // Более детальное сообщение об ошибке
      const errorMessage = err instanceof Error ? err.message : 'Invalid email or password';

      console.error('❌ Сообщение для пользователя:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log('=== КОНЕЦ ЛОГИНА ===');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

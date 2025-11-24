// @ts-nocheck
'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import '../assets/page.css';

export default function Home() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const createParticles = (intensity: number) => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    // Количество частиц зависит от интенсивности
    const particleCount = intensity === 1 ? 4 : 10;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Случайная стартовая позиция
      const startX = Math.random() * rect.width;
      const startY = Math.random() * rect.height;

      // Угол и скорость
      const angle = Math.random() * Math.PI * 2;
      const baseVelocity = intensity === 1 ? 30 : 80;
      const randomVelocity = Math.random() * (intensity === 1 ? 50 : 120);
      const velocity = baseVelocity + randomVelocity;

      const endX = startX + Math.cos(angle) * velocity;
      const endY = startY + Math.sin(angle) * velocity;

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.setProperty('--endX', `${endX}px`);
      particle.style.setProperty('--endY', `${endY}px`);

      button.appendChild(particle);

      // Удаляем частицу после анимации
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  };

  // Постоянное создание частиц
  useEffect(() => {
    const interval = setInterval(() => {
      createParticles(isHovered ? 2 : 1);
    }, 100);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="container">
      <Link href="/main">
        <button
          ref={buttonRef}
          className="particle-button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="button-text">Welcome to Uniform Web!</span>
        </button>
      </Link>
    </div>
  );
}

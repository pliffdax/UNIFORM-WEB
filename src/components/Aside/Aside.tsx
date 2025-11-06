import './Aside.css';
import Link from 'next/link';

export default function Aside() {
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
    </aside>
  );
}

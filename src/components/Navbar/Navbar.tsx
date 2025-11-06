import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/main" className="navbar-logo">
          Uniform Web
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-menu-item">
            <Link href="/main">Home</Link>
          </li>
          <li className="navbar-menu-item">
            <Link href="/main">About</Link>
          </li>
          <li className="navbar-menu-item">
            <Link href="/main">Contact</Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <button className="navbar-actions-button">Log in</button>
        </div>
      </div>
    </nav>
  );
}

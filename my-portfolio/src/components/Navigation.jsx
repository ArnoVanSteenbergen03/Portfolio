import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="nav__title">Portfolio Arno Van Steenbergen</h1>
        <ul className="nav__list">
          <li><Link className={`nav__link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link></li>
          <li><Link className={`nav__link ${location.pathname === '/projects' ? 'active' : ''}`} to="/projects">Projects</Link></li>
          <li><Link className={`nav__link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link></li>
          <li><Link className={`nav__link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
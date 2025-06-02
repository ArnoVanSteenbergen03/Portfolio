import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <header className="header">
      <nav className="nav">
        <h1 className="nav__title">Portfolio Arno Van Steenbergen</h1>
        <ul className="nav__list">
          <li><Link className="nav__link" to="/">Home</Link></li>
          <li><Link className="nav__link" to="/projects">Projects</Link></li>
          <li><Link className="nav__link" to="/about">About</Link></li>
          <li><Link className="nav__link" to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
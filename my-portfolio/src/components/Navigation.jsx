import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="nav__title">Portfolio Arno Van Steenbergen</h1>
        <button
          className="nav__theme"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <svg
              className="theme__sun"
              width="24"
              height="24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="5" />
              <g>
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
          ) : (
            <svg
              className="theme__moon"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          )}
        </button>
        <ul className="nav__list">
          <li>
            <Link className="nav__link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav__link" to="/projects">
              Projects
            </Link>
          </li>
          <li>
            <Link className="nav__link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav__link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

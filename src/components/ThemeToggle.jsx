import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.css';
import { MoonIcon, SunIcon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggleButton}
      aria-label="Toggle theme"
    > Theme
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
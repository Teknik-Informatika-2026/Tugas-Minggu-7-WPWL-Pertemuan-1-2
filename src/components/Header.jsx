import React from 'react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className={`site-header ${theme}`}>
      <div className="header-brand">
        <h1 className="header-title">React Context API</h1>
        <p className="student-name">
          Nama: <span>Ahmad Azizul Amin</span>
        </p>
      </div>
      <div className="header-right">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;

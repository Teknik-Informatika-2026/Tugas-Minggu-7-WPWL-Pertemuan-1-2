import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`site-footer ${theme}`}>
      <p>© 2026 Ahmad Azizul Amin. All right reserved</p>
    </footer>
  );
};

export default Footer;

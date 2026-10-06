import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { theme } = useTheme();

  return React.createElement(
    'footer',
    { className: `site-footer ${theme}` },
    React.createElement('p', null, '© 2026 Ahmad Azizul Amin. All right reserved')
  );
};

export default Footer;

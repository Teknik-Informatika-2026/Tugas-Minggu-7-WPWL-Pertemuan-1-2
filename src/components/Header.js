import React from 'react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const { theme } = useTheme();

  return React.createElement(
    'header',
    { className: `site-header ${theme}` },
    React.createElement(
      'div',
      { className: 'header-brand' },
      React.createElement('h1', { className: 'header-title' }, 'React Context API'),
      React.createElement(
        'p',
        { className: 'student-name' },
        'Nama: ',
        React.createElement('span', null, 'Ahmad Azizul Amin')
      )
    ),
    React.createElement(
      'div',
      { className: 'header-right' },
      React.createElement(ThemeToggle)
    )
  );
};

export default Header;

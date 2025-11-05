import React from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mf-header">
      <div className="mf-header-content">
        <h1 className="mf-header-title">{title}</h1>
        {subtitle && <p className="mf-header-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
};

export default Header;

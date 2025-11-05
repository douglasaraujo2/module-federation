// ===== UI Components =====

declare module 'remote/Button' {
  import React from 'react';

  interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
  }

  const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module 'remote/Card' {
  import React from 'react';

  interface CardProps {
    title: string;
    content: string;
    footer?: React.ReactNode;
  }

  const Card: React.FC<CardProps>;
  export default Card;
}

declare module 'remote/Header' {
  import React from 'react';

  interface HeaderProps {
    title: string;
    subtitle?: string;
  }

  const Header: React.FC<HeaderProps>;
  export default Header;
}

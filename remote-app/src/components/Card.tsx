import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  content: string;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content, footer }) => {
  return (
    <div className="mf-card">
      <div className="mf-card-header">
        <h3 className="mf-card-title">{title}</h3>
      </div>
      <div className="mf-card-content">
        <p>{content}</p>
      </div>
      {footer && (
        <div className="mf-card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;

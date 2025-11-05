import React from 'react';
import Button from './components/Button';
import Card from './components/Card';
import Header from './components/Header';
import { useAppStore } from './store/AppStore';

const App: React.FC = () => {
  const { state, toggleTheme } = useAppStore();

  const handleClick = (): void => {
    alert('Button clicked in Remote App!');
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      background: state.theme === 'dark' ? '#2c3e50' : '#fff',
      color: state.theme === 'dark' ? '#ecf0f1' : '#2c3e50',
      minHeight: '100vh',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Remote Application (Port 3002)</h1>
        <button
          onClick={toggleTheme}
          style={{
            padding: '15px 30px',
            borderRadius: '8px',
            border: 'none',
            background: state.theme === 'dark' ? '#f39c12' : '#3498db',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}>
          {state.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <p style={{ color: state.theme === 'dark' ? '#bdc3c7' : '#7f8c8d', fontSize: '18px', marginBottom: '40px' }}>
        This is the remote application that exposes components and state via Module Federation.
      </p>

      <Header title="Shared header Demo" subtitle="Toggle theme to test dark and light mode" />

      {/* Theme Info Box */}
      <div style={{
        marginTop: '30px',
        padding: '30px',
        background: state.theme === 'dark' ? '#34495e' : '#ecf8ff',
        borderRadius: '12px',
        borderLeft: `6px solid ${state.theme === 'dark' ? '#3498db' : '#2980b9'}`
      }}>
        <h2 style={{ marginTop: 0, fontSize: '24px' }}>Current Theme: {state.theme.toUpperCase()}</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Click the button above to toggle between light and dark modes.
        </p>
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: state.theme === 'dark' ? '#2c3e50' : '#fff',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <strong>How it works:</strong>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li>Theme state is stored in AppStore (React Context)</li>
            <li>State is persisted to localStorage</li>
          </ul>
        </div>
      </div>

      {/* Original Components */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: state.theme === 'dark' ? '#ecf0f1' : '#34495e' }}>UI Components Demo</h2>

        <div style={{ marginBottom: '30px' }}>
          <h3>Button Component:</h3>
          <Button onClick={handleClick}>
            Click Me
          </Button>
        </div>

        <div>
          <h3>Card Components:</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Card
              title="Shared Components"
              content="UI components are shared via Module Federation and can be used in other applications."
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

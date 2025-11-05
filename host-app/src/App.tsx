import React, { Suspense, lazy } from 'react';
import { useAppStore } from './store/AppStore';
// Lazy load components from remote app
const RemoteButton = lazy(() => import('remote/Button'));
const RemoteCard = lazy(() => import('remote/Card'));
const RemoteHeader = lazy(() => import('remote/Header'));

const App: React.FC = () => {
  const { state, toggleTheme } = useAppStore();

  const handleButtonClick = (): void => {
    alert('Button from Remote App clicked from host app!');
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      background: state.theme === 'dark' ? '#2c3e50' : '#f8f9fa',
      color: state.theme === 'dark' ? '#ecf0f1' : '#2c3e50',
      minHeight: '100vh',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Host Application (Port 3001)</h1>
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
        This is the host application consuming components and state from the remote application via Module Federation.
      </p>

      <Suspense fallback={<div>Loading Remote Header...</div>}>
        <RemoteHeader
          title="Cross-App Header"
          subtitle="New subtitle"
        />
      </Suspense>

      {/* Theme Sync Info */}
      <div style={{
        marginTop: '30px',
        padding: '30px',
        background: state.theme === 'dark' ? '#34495e' : '#e8f5e9',
        borderRadius: '12px',
        borderLeft: `6px solid ${state.theme === 'dark' ? '#2ecc71' : '#27ae60'}`
      }}>
        <h2 style={{ marginTop: 0, fontSize: '24px' }}>✅ Current Theme Synced: {state.theme.toUpperCase()}</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Test theme toggle.
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

      {/* Original Components Demo */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: state.theme === 'dark' ? '#ecf0f1' : '#34495e' }}>🎨 Remote Components Demo</h2>

        <div style={{ marginBottom: '20px' }}>
          <h3>Remote Button Component:</h3>
          <Suspense fallback={<div>Loading Button...</div>}>
            <RemoteButton onClick={handleButtonClick}>Click Me (From Remote)</RemoteButton>
          </Suspense>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Remote Card Components:</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Suspense fallback={<div>Loading Card...</div>}>
              <RemoteCard
                title="Shared Components"
                content="UI components are loaded from the remote app at runtime, enabling independent deployment."
              />
            </Suspense>

          </div>
        </div>
      </div>

    </div>
  );
};

export default App;

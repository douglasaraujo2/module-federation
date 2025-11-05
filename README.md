# Module Federation Testing

## Project Structure

This project consists of two React applications:

**[Remote App](https://douglas-araujo-8-remote-app-module-federation-dou-53f76abae-ze.zephyrcloud.app/)** - The provider application that exposes components to be shared
**[Host App](https://douglas-araujo-11-host-app-module-federation-doug-b264cc758-ze.zephyrcloud.app/)** - The consumer application that loads components from the remote app


```
module-federation/
├── host-app/          # Consumes remote components
│   ├── src/
│   │   ├── App.tsx           # Uses remote components
│   │   ├── bootstrap.tsx     # Async initialization
│   │   ├── index.ts          # Entry point
│   │   └── remote.d.ts       # TypeScript types for remote modules
│   ├── webpack.config.js     # Module Federation config
│   └── package.json
│
├── remote-app/        # Provides shared components
│   ├── src/
│   │   ├── components/       # Shared components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Header.tsxmanagement
│   │   └── App.tsx
│   ├── webpack.config.js     # Exposes components
│   └── package.json
│
└── package.json       # Root - runs both apps
```

## What's Included

### Shared Components
- **Button** - A styled button component with click handlers
- **Card** - Card layout with title, content, and styling
- **Header** - Header component with title and subtitle


## Technologies Used

- **React 18** - UI library
- **TypeScript 5** - Type safety across federated modules
- **Webpack 5** - Module bundler with Module Federation
- **Babel** - Transpiles TypeScript and JSX

## Quick Start

### 1. Install Dependencies

From the root folder, run:

```bash
npm install
```

This will install dependencies for both applications.

### 2. Start Both Applications

```bash
cd remote-app
npm start
```

```bash
cd host-app
npm start
```

This starts both apps at the same time:
- **Remote App**: http://localhost:3002
- **Host App**: http://localhost:3001

Open both URLs in your browser to see Module Federation in action!

### 3. What to Look For

- The **Host App** displays components loaded from the **Remote App**
- Click the theme toggle button in either app to switch between light/dark mode
- Each app maintains its own theme state independently
- The Button, Card, and Header components in the Host App are all loaded from the Remote App at runtime

## Environment Variables

The project uses `.env` files for configuration (already set up with defaults):

**Host App** (`.env`):
```env
PORT=3001
REMOTE_URL=http://localhost:3002/remoteEntry.js
```

**Remote App** (`.env`):
```env
PORT=3002
```

For production deployment, update `REMOTE_URL` to point to your deployed remote app.

## How It Works

### Step 1: Remote App Exposes Components

The remote app uses Webpack's `ModuleFederationPlugin` to expose components:

```javascript
// remote-app/webpack.config.js
new ModuleFederationPlugin({
  name: 'remote',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/Button',
    './Card': './src/components/Card',
    './Header': './src/components/Header',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
})
```

### Step 2: Host App Consumes Components

The host app configures where to load remote components from:

```javascript
// host-app/webpack.config.js
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    remote: 'remote@http://localhost:3002/remoteEntry.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
})
```

### Step 3: Import and Use Remote Components

In the host app, import components as if they're local:

```typescript
import { Suspense, lazy } from 'react';
import { useAppStore } from 'remote/AppStore';

const RemoteButton = lazy(() => import('remote/Button'));

function App() {
  const { state, toggleTheme } = useAppStore();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RemoteButton onClick={() => alert('Hello!')}>
        Click Me
      </RemoteButton>
    </Suspense>
  );
}
```

## Important Concepts

### Bootstrap Pattern

Both apps use a **bootstrap pattern** to avoid Module Federation initialization errors:

**index.ts** (entry point):
```typescript
import('./bootstrap');
```

**bootstrap.tsx** (actual app):
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
// ... rest of app code
```

This ensures Module Federation loads before React, preventing "Shared module is not available for eager consumption" errors.

### TypeScript Support

The host app includes type declarations for remote modules in `remote.d.ts`:

```typescript
declare module 'remote/Button' {
  interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
  }
  const Button: React.FC<ButtonProps>;
  export default Button;
}
```

This gives you full IntelliSense and type checking for components loaded at runtime!

```

## Building for Production

```bash
# Build remote app first
cd remote-app
npm run build

# Then build host app
cd ../host-app
npm run build
```

After building, deploy the `dist/` folders to your hosting platform. Update the `REMOTE_URL` environment variable in the host app to point to your deployed remote app.

## Troubleshooting

### Components not loading?
- Make sure the remote app (port 3002) is running before opening the host app
- Check the browser console for errors
- Verify `REMOTE_URL` in host-app/.env is correct

### Port already in use?
- Change the PORT in the `.env` files
- Or stop the running servers and restart them


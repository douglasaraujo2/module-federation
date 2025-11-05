import React, { ReactNode } from 'react';
import { AppStoreProvider } from '../store/AppStore';

interface StoreWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper component that provides AppStore context
 * Use this to wrap any components that need access to the shared state
 */
const HostStoreWrapper: React.FC<StoreWrapperProps> = ({ children }) => {
  return <AppStoreProvider>{children}</AppStoreProvider>;
};

export default HostStoreWrapper;

import React, { createContext, useContext, useState } from 'react';
import SubscribeModal from '../components/SubscribeModal/SubscribeModal';

const SubscribeContext = createContext();

export function SubscribeProvider({ children }) {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  const openSubscribeModal = () => setIsSubscribeOpen(true);
  const closeSubscribeModal = () => setIsSubscribeOpen(false);

  return (
    <SubscribeContext.Provider
      value={{
        isSubscribeOpen,
        openSubscribeModal,
        closeSubscribeModal,
      }}
    >
      {children}
      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={closeSubscribeModal}
      />
    </SubscribeContext.Provider>
  );
}

export function useSubscribeModal() {
  const context = useContext(SubscribeContext);
  if (!context) {
    throw new Error('useSubscribeModal must be used within a SubscribeProvider');
  }
  return context;
}

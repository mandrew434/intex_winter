// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface UserIdentityContextType {
  sessionEmail: string;
  setSessionEmail: (email: string) => void;
}

const UserIdentityContext = createContext<UserIdentityContextType>({
    sessionEmail: '',
  setSessionEmail: () => {}
});

export const UserIdentityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionEmail, setSessionEmail] = useState<string>('');
  return (
    <UserIdentityContext.Provider value={{ sessionEmail, setSessionEmail }}>
      {children}
    </UserIdentityContext.Provider>
  );
};

// Custom hook for convenience
export const useUserIdentity = () => useContext(UserIdentityContext);

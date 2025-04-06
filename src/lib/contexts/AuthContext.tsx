"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // For now, we're just providing a mock authentication context
  // This will be replaced with real Firebase auth if needed later
  
  const mockAuthValue: AuthContextType = {
    user: null,
    loading: false,
    signInWithGoogle: async () => {
      console.log("Sign in with Google clicked");
      // This is just a mock and doesn't actually authenticate
    },
    signOut: async () => {
      console.log("Sign out clicked");
      // This is just a mock and doesn't actually sign out
    },
  };

  return (
    <AuthContext.Provider value={mockAuthValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext };

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ViewMode = "galaxy" | "solar";

interface AppContextType {
  activePlanet: string | null;
  setActivePlanet: (planet: string | null) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activePlanet, setActivePlanet] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("galaxy");
  const [isMuted, setIsMuted] = useState(true);

  return (
    <AppContext.Provider
      value={{
        activePlanet,
        setActivePlanet,
        viewMode,
        setViewMode,
        isMuted,
        setIsMuted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

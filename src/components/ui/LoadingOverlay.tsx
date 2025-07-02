'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Context
interface LoadingOverlayContextType {
  show: () => void;
  hide: () => void;
  isLoading: boolean;
}

const LoadingOverlayContext = createContext<LoadingOverlayContextType | undefined>(undefined);

export function useLoadingOverlay() {
  const ctx = useContext(LoadingOverlayContext);
  if (!ctx) throw new Error('useLoadingOverlay must be used within a LoadingOverlayProvider');
  return ctx;
}

export function LoadingOverlayProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const show = () => setIsLoading(true);
  const hide = () => setIsLoading(false);

  return (
    <LoadingOverlayContext.Provider value={{ show, hide, isLoading }}>
      {children}
      <LoadingOverlay isLoading={isLoading} />
    </LoadingOverlayContext.Provider>
  );
}

export function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  return (
    <div className="absolute inset-0 w-full h-full z-50 flex items-center justify-center bg-black/30 transition-opacity duration-300">
      <div className="relative w-24 h-24">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute w-5 h-5 bg-black rounded-full"
            style={{
              left: `${44 + 40 * Math.cos((i / 8) * 2 * Math.PI)}%`,
              top: `${44 + 40 * Math.sin((i / 8) * 2 * Math.PI)}%`,
              animation: `orbit 1.2s linear infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
        <style jsx>{`
          @keyframes orbit {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(0.6); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}

export function LoadingOverlayTestButton() {
  const { show, hide } = useLoadingOverlay();
  return (
    <button
      onClick={() => {
        show();
        setTimeout(hide, 2000);
      }}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Show Loader
    </button>
  );
} 
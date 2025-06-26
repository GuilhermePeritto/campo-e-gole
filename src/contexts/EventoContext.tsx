
import React, { createContext, useContext, useState } from 'react';

interface EventoContextType {
  eventos: any[];
  loading: boolean;
}

const EventoContext = createContext<EventoContextType | undefined>(undefined);

export const useEvento = () => {
  const context = useContext(EventoContext);
  if (!context) {
    throw new Error('useEvento must be used within an EventoProvider');
  }
  return context;
};

export const EventoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <EventoContext.Provider value={{
      eventos,
      loading
    }}>
      {children}
    </EventoContext.Provider>
  );
};

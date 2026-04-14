import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext(null);

const initialEntries = [];

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(initialEntries);

  const addEntry = (type, friendName, friendId) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      id: `t${Date.now()}`,
      type,
      title: `${capitalize(type)} with ${friendName}`,
      date: today,
      friendId,
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function useTimeline() {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error('useTimeline must be used within TimelineProvider');
  return ctx;
}

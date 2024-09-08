// SessionContext.js
import React, { createContext, useState,useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Provider as PaperProvider } from 'react-native-paper';


const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
      // console.log(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <PaperProvider>

    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
    </PaperProvider>

  );
};

export default SessionContext;

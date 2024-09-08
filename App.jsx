import React, {useEffect, useState} from 'react';
import {supabase} from './src/lib/supabase';
import {NavigationContainer} from '@react-navigation/native';
import { SessionProvider } from './src/utils/SessionContext';
import BottomNavigator from './src/navigation/BottomNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

const App = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
      // console.log("App-##############",session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);


  return (
    <SessionProvider>

    <NavigationContainer>
      {session ? (
        <BottomNavigator />
      ) : (
        <AuthNavigator/>
      )}
    </NavigationContainer>
        
    </SessionProvider>

  );
};

export default App;
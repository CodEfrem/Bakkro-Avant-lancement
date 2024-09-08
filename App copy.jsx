import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {supabase} from './src/lib/supabase';

const App = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);



  return (
    <View style={{marginTop: 100}}>
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
    
  );
};

export default App;

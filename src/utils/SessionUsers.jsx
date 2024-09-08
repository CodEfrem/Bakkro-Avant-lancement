import React, { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getUser() {
            try {
                setLoading(true);
                const user = supabase.auth.user();
                if (!user) throw new Error('No user authenticated!');

                const { data, error, status } = await supabase
                    .from('users')
                    .select('*')
                    .eq('phone', user.phone)
                    .single();

                if (error && status !== 406) {
                    throw error;
                }

                if (data) {
                    setUserData(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getUser();
    }, []);

    return (
        <SessionContext.Provider value={{ userData, loading }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);

import React from 'react';
import { supabase } from '../../lib/supabase';
import { Button, Input } from 'react-native-elements';
import { Session } from '@supabase/supabase-js';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SearchButton from '../../components/Buttons/SearchButton';
import HomeHouseCard from '../../components/Card/HomeHouse/HomeHouseCard';
import styles from './Styles';
import globalestyles from '../../../GolbaleStyle';

function HomeScreen({ session }: { session: Session }) {
  const [loading, setLoading] = React.useState(true);
  const [firstname, setFirstname] = React.useState('');
  const [primaryKey, setPrimary] = React.useState('');

  React.useEffect(() => {
    if (session) {
      getUser(); // Fetch user information
      const unsubscribe = setupRealtimeSubscription(); // Set up Realtime subscription
      return () => unsubscribe(); // Clean up subscription on unmount
    }
  }, [session]);

  // Function to fetch user information
  async function getUser() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('users')
        .select(`*`)
        .eq('phone', session?.user.phone)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFirstname(data.firstname); // Update firstname with the fetched data
        setPrimary(data.id);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  // Function to set up the Realtime subscription
  function setupRealtimeSubscription() {
    const channel = supabase
      .channel('users-changes') // Create a new Realtime channel named 'users-changes'
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `phone=eq.${session?.user.phone}`, // Filter updates for the current user based on the phone
        },
        payload => {
          // console.log('Change received!', payload);
          const updatedUser = payload.new;
          setFirstname(updatedUser.firstname); // Update firstname when a change is detected
        }
      )
      .subscribe(); // Subscribe to the Realtime channel

    return () => {
      supabase.removeChannel(channel); // Unsubscribe when the component is unmounted to avoid memory leaks
    };
  }

  const handleCardPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Custom header */}
      <View style={globalestyles.Head}>
        <View style={styles.Right}>
          <Text variant="headlineSmall">
            Salut
            <Text style={{ fontWeight: 'bold' }}> {firstname || 'User'} !</Text>
          </Text>
          <Text variant="bodyLarge" style={globalestyles.TitleMedium}>
            Bienvenue sur Bakkrô
          </Text>
          <SearchButton />
        </View>
        {/* You can add other header elements here */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <View style={[styles.container]}>
          <View style={[globalestyles.marginTopS, styles.carouselSection]}>
            {/* Image carousel */}
            <HomeHouseCard />

            <View style={[globalestyles.marginTopL]}>
              <Text
                variant="titleLarge"
                style={[globalestyles.Weight500]}>
                Mon bien
              </Text>
              <View>
                <View style={[styles.GoodSection, globalestyles.marginTopM]}>
                  <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                    <Text variant="titleSmall">
                      Connaissez-vous la valeur de votre propriété?
                    </Text>
                    <Text
                      variant="bodySmall"
                      style={[globalestyles.marginTopXS]}>
                      Trouver le bon prix
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleCardPress("https://www.benicci-immobilier.com/estimer-mon-bien/")}>
                      <View
                        style={{
                          marginVertical: 10,
                          height: 43,
                          width: 80,
                          borderRadius: 30,
                          backgroundColor: '#E97400',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 14,
                            color: '#FFF',
                          }}>
                          Estimate
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Image
                      source={require('../../assets/images/House.png')}
                      style={{ marginTop: hp(5), width: wp(15) }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;

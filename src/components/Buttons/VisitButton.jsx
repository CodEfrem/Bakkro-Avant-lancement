import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { supabase } from '../../lib/supabase';
import SessionContext from '../../utils/SessionContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const VisitButton = ({ pId }) => {
  const { session } = useContext(SessionContext);
  const [subscription, setSubscription] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [primaryKey, setPrimary] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const [propertyId, setPropertyId] = useState('');

  useEffect(() => {
    setPropertyId(pId);
  }, [pId]);

  useEffect(() => {
    if (session) {
      getUser();
    }
  }, [session]);

  useEffect(() => {
    if (subscription) {
      console.log(subscription);
    }
  }, [subscription]);

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
        setSubscription(data.subscription);
        setPrimary(data.id);
        setPhone(data.phone);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
    console.log("Id utilisateur", data.id);
  }

  async function get_transaction_by_user_and_video(primaryKey, propertyId) {
    const current_date = new Date();
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', primaryKey)
      .eq('property_id', propertyId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    console.log("Transaction", transaction);
    if (transaction) {
      console.log('Transaction found:', transaction);
      const transactionDate = new Date(transaction.transaction_date);
      const timeDifference = current_date - transactionDate;
      const oneDayInMilliseconds = 86400000;

      if (transaction.property_id && timeDifference <= oneDayInMilliseconds) {
        return true;
      }
    }
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', primaryKey)
        .single();
       console.log("Abonnement", user.subscription); 
      if (userError) throw userError;
      if (user.subscription !== 'free') {
        return true;
      } 
      else {
        return false;
      }
  }

  async function recordTransaction() {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('transactions')
        .upsert({
          user_id: primaryKey,
          transaction_date: new Date(),
          amount: '10',
          property_id: propertyId, // Ensure propertyId is recorded in the transaction
        }, { returning: 'minimal' });
      console.log("user_id", primaryKey);
      console.log("la propriété", propertyId);
      if (error) {
        throw error;
      } else {
        console.log('Transaction recorded successfully!');
        Alert.alert('Success', 'Payment was successful.');
      }
    } catch (error) {
      console.error('Error recording transaction:', error);
      Alert.alert("Error", "There was an issue recording the transaction.");
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  }

  async function upgradeSubscription() {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ subscription: 'preniumWeek' })
        .eq('id', primaryKey);
      if (error) {
        throw error;
      } else {
        console.log('Subscription upgraded successfully!');
        Alert.alert('Success', 'Subscription upgraded to premiumWeek.');
      }
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      Alert.alert("Error", "There was an issue upgrading the subscription.");
    } finally {
      setLoading(false);
    }
  }

  const handlePress = async () => {
    console.log('Route name:', route.name);
  
    try {
      if (route.name === 'SearchScreen') {
        navigation.navigate('SearchFilterScreen');
      } else {
        navigation.navigate('Search');
      }
      console.log('Primary key:', primaryKey);
      console.log('Property ID:', propertyId);
      const canAccessVideo = await get_transaction_by_user_and_video(primaryKey, propertyId);
      console.log('Can access video:', canAccessVideo);
  
      if (canAccessVideo) {
        navigation.navigate('VideoPage');
      } else {
        Alert.alert(
          'Abonnement requis',
          'Vous devez être abonné pour accéder à cette page.',
          [
            { text: "S'abonner", onPress: async () => {
              await upgradeSubscription();
              Linking.openURL('http://localhost:3000');
            } },
            { text: "Payer à l'unité", onPress: async () => {
                await recordTransaction();
                Linking.openURL('http://localhost:3000');
              }
            },
            { text: 'Annuler', style: 'cancel' }
          ]
        );
      }
    } catch (error) {
      console.error('Error in handlePress:', error);
    }
  };

  return (
    <View style={[styles.btnContainer]}>
      <TouchableOpacity
        style={styles.accommodationBtn}
        onPress={handlePress}>
        <Text style={styles.accommodationBtnText}>Visiter à distance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accommodationBtn: {
    flexDirection: 'row',
    height: 50,
    width: wp(42),
    backgroundColor: '#E97400',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accommodationBtnText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#FFF',
  },
});

export default VisitButton;
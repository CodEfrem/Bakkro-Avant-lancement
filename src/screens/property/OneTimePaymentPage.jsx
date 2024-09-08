import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import SessionContext from '../../utils/SessionContext';
import { WebView } from 'react-native-webview';
import MyWebPage from '../../lib/cinetpay';
const OneTimePaymentPage = () => {
  const route = useRoute();
  const { propertyId } = route.params;
  const { session } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [primaryKey, setPrimary] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    if (session) {
      getUser();
    }
  }, [session]);
  async function getUser() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');
      const { data, error, status } = await supabase
        .from('users')
        .select('*')
        .eq('phone', session?.user.phone)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
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
  const handleOneTimePayment = () => {
    recordTransaction();
  };

  console.log('cinetpay', MyWebPage);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000FF" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pay for this video</Text>
      {/* <WebView
        originWhitelist={['*']}
        source={{ uri: './testCinetPay.html' }}
        style={styles.webview}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
export default OneTimePaymentPage;
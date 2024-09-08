import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase'; // Assurez-vous d'importer supabase correctement
import SessionContext from '../../utils/SessionContext';

const VisitProposalPage = () => {
  const { session } = useContext(SessionContext);
  const [subscription, setSubscription] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [primaryKey, setPrimary] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (session) {
      getUser(); // Récupère les informations de l'utilisateur
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
  }

  async function registerUser() {
    setLoading(true);
    setSubscription('free');
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({
          id: primaryKey,
          subscription: 'free',
          phone,
        }, { returning: 'minimal' }); // Ajoutez l'option returning pour éviter de renvoyer les données mises à jour

      if (error) {
        throw error;
      } else {
        console.log('Utilisateur mis à jour avec succès !');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      Alert.alert("Problème lors de la mise à jour de l'utilisateur");
    } finally {
      setLoading(false);
    }
  }

  const handleVisitPress = () => {
    if (subscription === 'free') {
      Alert.alert(
        'Abonnement requis',
        'Vous devez être abonné pour accéder à cette page.',
        [
          { text: "S'abonner", onPress: () => navigation.navigate('SubscriptionPage') },
          { text: "Payer à l'unité", onPress: () => navigation.navigate('OneTimePaymentPage') },
          { text: 'Annuler', style: 'cancel' }
        ]
      );
    } else {
      if (subscription === 'preniumDay') {
        setTimeout(() => {
          registerUser();
        }, 1000); // Délai de 1 seconde (1000 ms)
      }
      if (subscription === 'preniumWeek') {
        setTimeout(() => {
          registerUser();
        }, 10000); // Délai de 10 secondes (10000 ms)
      }
      if (subscription === 'preniumMonth') {
        setTimeout(() => {
          registerUser();
        }, 20000); // Délai de 1 minute (60000 ms)
      }
      navigation.navigate('VideoPage');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Vous pouvez visiter cette propriété à distance en cliquant sur le bouton ci-dessous.
      </Text>
      <Button title="Visiter en ligne" onPress={handleVisitPress} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default VisitProposalPage;

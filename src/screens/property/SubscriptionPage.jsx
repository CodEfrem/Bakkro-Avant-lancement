import React , { useEffect, useState, useContext }from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase'; // Assurez-vous d'importer supabase correctement
import SessionContext from '../../utils/SessionContext';


const subscriptionPlans = [
  { id: 'premiumDay', name: 'Premium - 1 Day', price: '$1.99' },
  { id: 'premiumWeek', name: 'Premium - 1 Week', price: '$5.99' },
  { id: 'premiumMonth', name: 'Premium - 1 Month', price: '$19.99' },
];

const SubscriptionPage = () => {
  const { session } = useContext(SessionContext);
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = () => {
    if (selectedPlan) {
      // Logique de souscription basée sur selectedPlan
      console.log(`Subscribing to: ${selectedPlan.name}`);
      navigation.goBack();
    } else {
      alert('Please select a subscription plan');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choisissez un plan d'abonnement</Text>
      <FlatList
        data={subscriptionPlans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.planContainer,
              item.id === selectedPlan?.id && styles.selectedPlan,
            ]}
            onPress={() => setSelectedPlan(item)}
          >
            <Text style={styles.planName}>{item.name}</Text>
            <Text style={styles.planPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="S'abonner" onPress={handleSubscribe} />
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
    fontSize: 24,
    marginBottom: 20,
  },
  planContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedPlan: {
    borderColor: '#E97400',
    backgroundColor: '#fbe7d0',
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 16,
    color: '#555',
  },
});

export default SubscriptionPage;

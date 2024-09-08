import React from 'react';
import { TouchableOpacity, View, Image, Alert, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import globalestyles from '../../../GolbaleStyle';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchButton from '../../components/Buttons/SearchButton';
import Header from '../../components/Header';
import { Session } from '@supabase/supabase-js';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function PaymentsScreen({ session }: { session: Session }) {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [userId, setUserId] = React.useState('');
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
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
        setUserId(data.id);
        fetchTransactions(data.id);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchTransactions(userId: string) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      setTransactions(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  const renderTransaction = ({ item }) => (
    <View style={{ width: wp(90), marginTop: wp(10) }}>
      <Text variant="bodyLarge">Le: {format(new Date(item.transaction_date), 'd MMMM yyyy', { locale: fr })}</Text>
      <Text variant="bodyLarge">Montant: {item.amount} XOF</Text>
      {/* <Text>Status: {item.status}</Text> */}
    </View>
  );

  return (
    <View style={globalestyles.body}>
      <Header title="Mes paiements" />
      <TouchableOpacity
        style={globalestyles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <View>
          <Image source={require('../../assets/images/backArrow.png')} />
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <Text>Loading...</Text>
        ) : transactions.length === 0 ? (
          <>
            <Text
              variant="titleLarge"
              style={[globalestyles.Weight600, globalestyles.headlineSmall]}
            >
              Aucun Paiement.
            </Text>
            <View style={{ width: wp(94), marginTop: wp(4) }}>
              <Text variant="titleMedium" style={{ textAlign: 'center' }}>
                Vous trouverez sur cette page la liste vos paiements effectués.
              </Text>
            </View>
          </>
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
        <SearchButton />
      </View>
    </View>
  );
}

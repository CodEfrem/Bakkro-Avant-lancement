import React, {useEffect, useState} from 'react';
import {supabase} from '../../lib/supabase';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Session} from '@supabase/supabase-js';
import {useNavigation} from '@react-navigation/native';
import globalestyles from '../../../GolbaleStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import {Divider, Text, TextInput} from 'react-native-paper';

// Kn25061996
// 330629123194

export default function Account({session}: {session: Session}) {
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [primaryKey, setPrimary] = useState('');

  const navigation = useNavigation();

  // console.log("##############", session);

  useEffect(() => {
    // Ajout du console.log pour afficher l'identifiant de l'utilisateur
    if (session) getUser();
    // console.log("ID du nouvel user:", session?.user.id);
  }, [session]);

  async function getUser() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const {data, error, status} = await supabase
        .from('users')
        .select(`*`)
        .eq('phone', session?.user.phone)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      console.log('&&&', data, error, session?.user.phone);
      if (data) {
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setPhone(data.phone);
        setPassword(data.password);
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

  async function registerUser() {
    setLoading(true);
    try {
      const {data, error} = await supabase.from('users').upsert({
        id: primaryKey,
        phone,
        firstname,
        lastname,
        password,
      }); // Ajoutez l'option returning pour éviter de renvoyer les données mises à jour

      if (error) {
        throw error;
      } else {
        console.log('Utilisateur mis à jour avec succès !');
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      Alert.alert("Problème lors de la mise à jour de l'utilisateur");
    } finally {
      setLoading(false);
    }
  }

  async function deleteAccount() {
    try {
      const {error} = await supabase
        .from('users')
        .delete()
        .eq('id', session.user.id);
      if (error) {
        throw error;
      }
      // Si la suppression réussit, déconnectez l'utilisateur
      await supabase.auth.signOut();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  return (
    <View style={globalestyles.body}>
      <Header title="Informations personnelles" />
      <TouchableOpacity
        style={globalestyles.backArrow}
        onPress={() => navigation.goBack()}>
        <View>
          <Image source={require('../../assets/images/backArrow.png')} />
        </View>
      </TouchableOpacity>

      <View style={{alignSelf: 'center', width: '80%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[globalestyles.marginTopM]}>
            <View
              style={{
                width: wp(50),
                alignSelf: 'center',
              }}></View>
            <View style={globalestyles.marginTopM}>
              <View
                style={{
                  paddingVertical: wp(4),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{width: wp(15)}}>
                  <Text variant="bodyLarge" style={globalestyles.bodyLarge}>
                    Tél.
                  </Text>
                </View>
                <TextInput
                  style={{
                    backgroundColor: '#FFF',
                    flex: 1,
                    marginLeft: wp(4),
                  }}
                  value={session?.user?.phone}
                  disabled={true}
                  textColor="#E97400"
                  mode="outlined"
                  outlineColor="#FFF"
                  activeOutlineColor="#FFF"
                />
              </View>
              <Divider />
              <View
                style={{
                  paddingVertical: wp(4),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{width: wp(15)}}>
                  <Text variant="bodyLarge" style={globalestyles.bodyLarge}>
                    Nom
                  </Text>
                </View>
                <TextInput
                  style={{
                    backgroundColor: '#FFF',
                    flex: 1,
                    marginLeft: wp(4),
                  }}
                  value={firstname || ''}
                  onChangeText={text => setFirstname(text)}
                  mode="outlined"
                  outlineColor="#FFF"
                  activeOutlineColor="#FFF"
                />
              </View>
              <Divider />
              <View
                style={{
                  paddingVertical: wp(4),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{width: wp(15)}}>
                  <Text variant="bodyLarge" style={globalestyles.bodyLarge}>
                    Prénom
                  </Text>
                </View>
                <TextInput
                  style={{
                    backgroundColor: '#FFF',
                    flex: 1,
                    marginLeft: wp(4),
                  }}
                  value={lastname}
                  onChangeText={text => setLastname(text)}
                  mode="outlined"
                  outlineColor="#FFF"
                  activeOutlineColor="#FFF"
                />
              </View>
              <Divider />
              <Divider />
              <View
                style={{
                  paddingVertical: wp(8),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{width: wp(50)}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ResetWithActualScreen', {
                        password,
                        phone,
                      })
                    }>
                    <Text variant="bodyLarge" style={globalestyles.bodyLarge}>
                      Modifier mot de passe
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  height: wp(15),
                  width: wp(80),
                  backgroundColor: '#E97400',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                }}
                onPress={registerUser} // Correction ici
                disabled={loading}>
                <Text variant="bodyLarge" style={{color:'#FFF'}}>
                  Mettre a jour
                </Text>
              </TouchableOpacity>
              {/* <Button
              style={{
                height: wp(15),
                width: wp(80),
                backgroundColor: "#E97400",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}
                title={loading ? 'Chargement ...' : 'Mise à jour'}
                titleStyle={
                  backg
                }
                onPress={registerUser} // Correction ici
                disabled={loading}
              /> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});


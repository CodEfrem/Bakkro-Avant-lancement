import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Text, Modal, Portal, Button} from 'react-native-paper';
import globalestyles from '../../../GolbaleStyle';
import {Session} from '@supabase/supabase-js';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import {supabase} from '../../lib/supabase';

export default function SettingScreen({session}: {session: Session}) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

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
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
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

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleDeleteAccount = async () => {
    try {
      hideModal();
      deleteAccount();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      borderRadius: 10,
      width: wp(80),
      alignSelf: 'center',
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf:'center',
      marginTop: 20,
      width:'90%'
    },
    confirmBtn: {
      flexDirection: 'row',
      height: 43,
      width: wp(30),
      backgroundColor: '#E97400',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },

    cancelmBtn: {
      flexDirection: 'row',
      height: 43,
      width: wp(30),
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor:'#E97400',
      borderWidth:2
    },
      BtnText: {
      color: '#FFF',
    }
  });

  return (
    <View style={globalestyles.body}>
      <Header title="Paramètres" />
      <TouchableOpacity
        style={globalestyles.backArrow}
        onPress={() => navigation.goBack()}>
        <View>
          <Image source={require('../../assets/images/backArrow.png')} />
        </View>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={globalestyles.paddingLeft}>
          <View style={globalestyles.marginTopL}>
            {/* <TouchableOpacity onPress={() => console.log('setting notif')}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/notification.png')}
                  />
                  <Text
                    variant="titleMedium"
                    style={[globalestyles.paddingLeft]}>
                    Notification{' '}
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Image source={require('../../assets/images/Right1.png')} />
                </View>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[globalestyles.marginTopL]}
              onPress={() =>
                navigation.navigate('PrivacyPolicyScreen' as never)
              }>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/images/privacy.png')} />
                  <Text
                    variant="titleMedium"
                    style={[globalestyles.paddingLeft]}>
                    Politique de confidentialité{' '}
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Image source={require('../../assets/images/Right1.png')} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalestyles.marginTopL]}
              onPress={() => navigation.navigate('HelpSupportScreen' as never)}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/images/support.png')} />
                  <Text
                    variant="titleMedium"
                    style={[globalestyles.paddingLeft]}>
                    Support et aide{' '}
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Image source={require('../../assets/images/Right1.png')} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalestyles.marginTopL]}
              onPress={() => supabase.auth.signOut()}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/images/logout.png')} />
                  <Text
                    variant="titleMedium"
                    style={[globalestyles.paddingLeft]}>
                    Deconnexion{' '}
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalestyles.marginTopL]}
              onPress={showModal}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/images/bin.png')} />
                  <Text
                    variant="titleMedium"
                    style={[globalestyles.paddingLeft]}>
                    Supprimer le compte{' '}
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}></View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <View style={{alignSelf: 'center', width: '85%'}}>
            <Text
              style={{textAlign: 'center', color: '#E97400', fontWeight: '600'}}
              variant="titleMedium">
              Confirmez-vous la suppression ?
            </Text>
            <View style={globalestyles.marginTopS}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#3A3A47',
                  fontWeight: '400',
                }}
                variant="bodySmall">
                Si vous confirmez, votre compte sera définitement supprimé
              </Text>
            </View>
          </View>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleDeleteAccount}>
              <Text style={styles.BtnText}>Confirmer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelmBtn}onPress={hideModal}>
              <Text>Annuler</Text>
            </TouchableOpacity>
            {/* <Button onPress={handleDeleteAccount}>
              <Text>Confirmer</Text>
            </Button> */}
            {/* <Button onPress={hideModal}>
              <Text>Annuler</Text>
            </Button> */}
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

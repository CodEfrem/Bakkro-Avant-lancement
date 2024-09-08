import React from 'react';
import {Image, TouchableOpacity, View, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import globalestyles from '../../../GolbaleStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';

const HelpSupportScreen = () => {
  const navigation = useNavigation();
  
  const styles = StyleSheet.create({
    btn: {
        flex :1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 168,
        height: 40,
        flexShrink: 0,
        borderRadius: 6,
        borderWidth :2,
        borderColor: '#E1E1E1',
        backgroundColor: '#FFF'
      }
  });

  return (
    <View style={globalestyles.body}>
      <Header title="Support et aide" />
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
            <View style={{width: wp(90)}}>
              <Text variant="titleSmall" style={[globalestyles.TitleMedium]}>
                Contactez-nous{' '}
              </Text>
              <Text variant="bodyMedium" style={globalestyles.marginTopM}>
                Discutez avec un spécialiste des clients
              </Text>
              <Text variant="bodyMedium" style={globalestyles.marginTopS}>
                Avez-vous des questions? Obtenez une aide en direct et en temps réel
                grâce à l'assistance par sms
              </Text>
              <View style={globalestyles.marginTopM}>
              <TouchableOpacity style={styles.btn}>
                <Text>Parlez maintenant</Text>
              </TouchableOpacity>
              </View>
              <Text
                variant="titleSmall"
                style={[globalestyles.TitleMedium, globalestyles.marginTopM]}>
                Appelez-nous{' '}
              </Text>
              <Text variant="bodyMedium" style={globalestyles.marginTopXS}>
                Contactez-nous gratuitement : Appelez simplement le numéro suivant
              </Text>
              <View style={globalestyles.marginTopM}>
              <TouchableOpacity style={styles.btn}>
                <Text>0130141540</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HelpSupportScreen;

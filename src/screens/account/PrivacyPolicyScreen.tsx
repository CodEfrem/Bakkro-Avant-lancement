import React from 'react';
import {Image, TouchableOpacity, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import globalestyles from '../../../GolbaleStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={globalestyles.body}>
      <Header title="Politique de confidentialités" />
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
                Conditions d'utilisation{' '}
              </Text>
              <Text variant="bodyMedium" style={globalestyles.marginTopXS}>
                Lorem ipsum dolor sit amet consectetur. Donec suspen disse
                dapibus leo feugiat sit cursus volutpat tincidunt augue. Egestas
                in auctor gravida non nunc justo. Nisl pellentesque dui
                elementum integer malesuada odio. Nec turpis at lacus sit
                aliquet condimentum turpis. Mal esuada pulvinar quis proin felis
                lacus. Scelerisque sit leo proin sit et id placerat.Lorem ipsum
                dolor sit amet consectetur. Donec suspendisse dapibus leo
                feugiat sit cursus volutpat tincidunt augue. Egestas in auctor
                gravida non nunc justo.
              </Text>
              <Text
                variant="titleSmall"
                style={[globalestyles.TitleMedium, globalestyles.marginTopM]}>
                Utilisateurs autorisés{' '}
              </Text>
              <Text variant="bodyMedium" style={globalestyles.marginTopXS}>
                Lorem ipsum dolor sit amet consectetur. Donec susp endisse
                dapibus leo feugiat sit cursus volutpat tincidunt augue. Egestas
                in auctor gravida non nunc justo. Nisl pellentesque dui
                elementum integer malesuada odio. Nec turpis at lacus sit
                aliquet condimentum turpis. Male suada pulvinar quis proin felis
                lacus. Scelerisque sit leo proin sit et id placerat.Lorem ipsum
                dolor sit amet consectetur. Donec suspendisse dapibus leo
                feugiat sit cursus volutpat tincidunt augue. Egestas in auctor
                gravi da Donec suspendisse dapibus leo feugiat sit cursus Do nec
                suspendisse dapibus leo Donec suspendisse dapi bus leo feugiat
                sit cursusDonec suspendisse dapibus leo feugiat sit
                cursusfeugiat sit cursusvolutpat tincidunt augue. Egestas in
                auctorDonec suspendisse dapibus leo feugiat sit cursus gravida
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PrivacyPolicyScreen;

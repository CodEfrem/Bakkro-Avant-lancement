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

const ProfileScreen = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('UserDetails' as never);
  };

  return (
    <View style={globalestyles.body}>
      <Header title="Mon compte" />
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={globalestyles.paddingLeft}>
          <View style={globalestyles.marginTopXL}>
            {/* <TouchableOpacity onPress={handlePress}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/images/Prenium.png')} />
                  <Text
                    variant="titleMedium"
                    style={[, globalestyles.paddingLeft]}>
                    Gérer mon abonement
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
              onPress={() => navigation.navigate('AcountScreen' as never)}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/images/profile.png')} />
                  <Text
                    variant="titleMedium"
                    style={[, globalestyles.paddingLeft]}>
                    Informations personnelles
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
              onPress={() => navigation.navigate('PaymentsScreen' as never)}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/images/payment.png')} />
                  <Text
                    variant="titleMedium"
                    style={[, globalestyles.paddingLeft]}>
                    Mes Paiments
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
              onPress={() => navigation.navigate('SettingScreen' as never)}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/images/setting.png')} />
                  <Text
                    variant="titleMedium"
                    style={[, globalestyles.paddingLeft]}>
                    Paramétres
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
          </View>
          <View style={{flex: 1, alignItems: 'center', top: wp(52)}}>
            <View>
              <Image
                source={require('../../assets/images/BotomLogoSmall.png')}
                resizeMode="contain"
              />
              <Text style={globalestyles.marginTopXS}>Bakkrô v1.001</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;

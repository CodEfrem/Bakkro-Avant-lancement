import React from 'react';
import {View,Image} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Text} from 'react-native-paper';

import Swiper from 'react-native-swiper';
import styles from './Style';
import CustomButton from '../../components/Buttons/Buttons';
import globalestyles from '../../../GolbaleStyle';
globalestyles



const LandingScreen = () => {

  const navigation = useNavigation();
  return (
    
    <Swiper
      loop={false}
      paginationStyle={{bottom: 20}}
      dotColor="white"
      activeDotColor="#E97400"
      dotStyle={styles.paginationDot}
      activeDotStyle={styles.activePaginationDot}>
      <View style={styles.slide}>
        <Image
          source={require('../../assets/images/landing/landing1.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.headlineSmall}>
        Économisez du temps et de l'argent grâce à nos visites à distance. Fini les déplacements couteux et inutiles !</Text>
        </View>
      </View>

      <View style={styles.slide}>
        <Image
          source={require('../../assets/images/landing/landing2.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.headlineSmall}>
            Notre application vous permet
            de parcourir une large sélection de biens immobiliers
          </Text> 
          
        </View>
      </View>

      <View style={styles.slide}>
        <Image
          source={require('../../assets/images/landing/landing3.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.headlineSmall}>
          Votre tranquillité d'esprit est notre priorité avec des annonces et des annonceurs  vérifiées
          </Text> 
        </View>
        <View style={styles.btnContainer}>
          <View>
            <CustomButton buttonText="Commencer" onPress={() => navigation.navigate('SignInScreen' as never)}/>
          </View>
        </View>
      </View>
    </Swiper>
  );
};

export default LandingScreen;

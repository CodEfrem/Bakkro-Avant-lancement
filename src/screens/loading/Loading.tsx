import * as React from 'react';
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {Image, Text, View} from 'react-native';
import styles from './Style';

const TheLoadingScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
        navigation.navigate("LandingScreen" as never); 
    }, 6000); 

     return () => clearTimeout(timer); 
}, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/loading/Logo.png')}
      />
      <Text style={styles.text}>Une nouvelle vision de l'immobilier </Text>
    </View>
  );
};

export default TheLoadingScreen;

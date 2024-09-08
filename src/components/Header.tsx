// Header.tsx composant

import React from 'react';
import { View,Image,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Ajout de l'importation
import {Text} from 'react-native-paper';
import globalestyles from '../../GolbaleStyle';
globalestyles

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation(); // Initialisation du hook useNavigation()

  return (
    <View
    style={globalestyles.Head}>
    <View style={{flex:1,alignItems:'center'}}>
            <View>
                <Text variant='titleLarge' style={globalestyles.Weight600}>{title}</Text>
            </View>
            {/* <TouchableOpacity style={globalestyles.backArrow} onPress={() => navigation.goBack()}>
                <Image  source={require('../assets/images/backArrow.png')}/>
            </TouchableOpacity> */}
    </View>
  </View>
  );
};


export default Header;

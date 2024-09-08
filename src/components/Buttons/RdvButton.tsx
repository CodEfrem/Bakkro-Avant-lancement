import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import globalestyles from '../../../GolbaleStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Text} from 'react-native-paper';

const RdvButton = () => {
  const navigation = useNavigation(); // Initialisation du hook useNavigation()
  const route = useRoute(); // Initialisation du hook useRoute()

  const handlePress = () => {
    console.log(route.name);
    
    if (route.name === 'SearchScreen') {
      navigation.navigate('SearchFilterScreen' as never);
    } else {
      navigation.navigate('Search' as never);
    }
  };

  return (
    <View style={[styles.btnContainer]}>
      <TouchableOpacity
        style={styles.accommodationBtn}
        onPress={handlePress}>
        <Text style={styles.accommodationBtnText}>Visiter sur place </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accommodationBtn: {
    flexDirection: 'row',
    height: 50,
    width: wp(42),
    backgroundColor: '#FFF',
    borderColor:'#E97400',
    borderWidth:1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accommodationBtnText: {
    fontWeight: '600',
    fontSize: 15,
  },
});

export default RdvButton;

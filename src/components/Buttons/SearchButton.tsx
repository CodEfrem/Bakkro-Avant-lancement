import React = require('react');
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import globalestyles from '../../../GolbaleStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Text} from 'react-native-paper';

const SearchButton = () => {
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
    <View style={[styles.btnContainer, globalestyles.marginTopM]}>
      <TouchableOpacity
        style={styles.accommodationBtn}
        onPress={handlePress}>
        <Image
          source={require('../../assets/images/SeachWhite.png')}
          style={{
            width: 20,
            height: 20,
            marginRight: 6,
            borderColor: '#FFF',
          }}
        />
        <Text style={styles.accommodationBtnText}>Nouvelle recherche </Text>
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
    height: 43,
    width: wp(50),
    backgroundColor: '#E97400',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accommodationBtnText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#FFF',
  },
});

export default SearchButton;

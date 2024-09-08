import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import globalestyles
 from '../../GolbaleStyle';
const Brand = () => {
  const { width } = useWindowDimensions();

  const getImageSource = () => {
    if (width <= 380) { // Par exemple, pour iPhone SE - 1
      return require('../assets/images/LogoSmall.png');
    } else {
      return require('../assets/images/Logo.png');
    }
  };

  return (
    <View style={[styles.logoContainer, globalestyles.marginTopXL]}>
      <Image
        source={getImageSource()}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
logoContainer: {
        justifyContent: 'center',
      }
});

export default Brand;

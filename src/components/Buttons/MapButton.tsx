import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import globalestyles from '../../../GolbaleStyle';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const MapButton = () => {
  return (
    <View style={{flexDirection: 'row',
    width: wp(92),
    justifyContent: 'flex-end',}}>
      <TouchableOpacity>
        <Text
          variant="bodyLarge"
          style={[
            globalestyles.bodyLarge,
            globalestyles.Weight500,
            globalestyles.marginTopS,
            globalestyles.colorprimary
          ]}>
          Maps
        </Text>
      </TouchableOpacity>
    </View>
  );
};


export default MapButton;

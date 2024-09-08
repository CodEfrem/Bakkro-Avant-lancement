import React from 'react';
import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '../Styles'; // Importation des styles spécifiques à ce composant
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';

const AmenitiesSection = ({ amenities, handleAmenityClick }) => {
  return (
    <View style={{flexDirection:'row', flexWrap:'wrap', alignSelf:'center',paddingLeft:wp(4)}}>
      {amenities.map((amenity: { status: any; activeImage: ImageSourcePropType; image: ImageSourcePropType; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal; }, index: React.Key) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleAmenityClick(index)}
          style={{ width: '18%', alignItems: 'center', marginTop: wp(6) }}>
          <Image
            source={amenity.status ? amenity.activeImage : amenity.image}
          />
          <Text style={{ color: amenity.status ? '#E97400' : 'rgba(58, 58, 71, 0.77)' }}>
            {amenity.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AmenitiesSection;

import React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import { heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen';


// Définition de l'interface pour les propriétés
interface Property {
  id: number; // Mettez à jour le type de l'ID en 'number'
  routeName: string;
  Web: string;
  title: string;
  city: string;
  neighborhood: string;
  workshop: number;
  date: string;
  time: string;
}

const AppointmentCard = ({data}: {data: Property[]}) => {
  const navigation = useNavigation();

  return (
    <View style={{width: '100%', flex: 1}}>
      {data.map((property: Property) => (
        <View
          key={property.id}
          style={{width: wp(92), height: 125, marginTop: 20,}}>
          {/* Ma Zone orange */}
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              flexDirection: 'row',
              backgroundColor: '#E97400',
              width: '100%',
              maxHeight: 28,
              borderTopRightRadius: 6,
              borderTopLeftRadius: 6,
            }}>
            {/* Ici Logo Calendrier + date */}
            <View style={{paddingLeft: wp(5), paddingVertical: 5,flexDirection:'row',alignItems:'center'}}>
              <Image source={require('../../../assets/DateCalendar.png')} style={{marginRight:wp(1)}}/>
              <Text style={{color: 'white'}}>{property.date}</Text>
            </View>
            {/* Logo horloge + heure */}
            <View style={{paddingLeft: wp(5), paddingVertical: 5,flexDirection:'row',alignItems:'center'}}>
              <Image source={require('../../../assets/Clock.png')} style={{marginRight:wp(1)}}/>
              <Text style={{color: 'white'}}>{property.time}</Text>
            </View>
          </View>

          {/* Ma Zone du bas */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              paddingTop: 5,
              borderWidth: 1,
              borderColor: '#E3E3E3',
            }}>
            {/* Image */}
            <View style={{width: 80, height: 80, marginHorizontal: 10}}>
              <Image
                source={{uri: property.Web}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 6,
                  marginTop: 2,
                }}
              />
            </View>
            {/* Text */}
            <View style={{padding: 10}}>
              <Text variant="titleSmall">
                {property.title} . {property.workshop} piéces
              </Text>
              <Text variant="bodySmall">{property.neighborhood}</Text>
              <Text variant="titleSmall" style={{color: '#E97400'}}>
                plus de détails.
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default AppointmentCard;
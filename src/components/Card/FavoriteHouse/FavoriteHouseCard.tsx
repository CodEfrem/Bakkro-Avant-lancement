import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
  View,
  Image,
} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import globalestyles from '../../../../GolbaleStyle';

// Définition de l'interface pour les propriétés
interface Property {
  id: number; // Mettez à jour le type de l'ID en 'number'
  routeName: string;
  Web: string;
  agenceImg: ImageSourcePropType;
  agenceName: string;
  title: string;
  city: string;
  neighborhood: string;
  size: number;
  workshop: number;
  rooms: number;
  price: number;
  nbPicture: number;
  video: string;
}
const FavoriteHouseCard = ({data}: {data: Property[]}) => {
  const navigation = useNavigation();

  return (
    <ScrollView style={globalestyles.marginTopL}>
      {data.map((property: Property) => (
        <View>
            {/* key={property.id} */}
          {/* onPress={() => navigation.navigate(property.routeName as never)} */}
          <Card
            style={{
              width: '88%',
              alignSelf: 'center',
              position: 'relative',
              backgroundColor:'#FFF',
              flexShrink: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              borderWidth: 0,
              shadowOpacity: 0,
              shadowColor: 'white',
              shadowOffset: {width: 0.1, height: 0.1},
              shadowRadius: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <TouchableOpacity>
              <Image source={property.agenceImg} />
              </TouchableOpacity>
              <Text
                variant="titleSmall"
                style={{
                  maxWidth: wp(55),
                  marginLeft: wp(1),
                  fontWeight: '600',
                }}>
                {' '}
                Exclusivité chez{' '}
                <TouchableOpacity>
                <Text
                  style={[globalestyles.colorprimary, globalestyles.Weight600]}>
                  {property.agenceName}
                </Text>
                </TouchableOpacity>
              </Text>
            </View>
            <TouchableOpacity>
            <Card.Cover
              source={{uri: property.Web}}
              style={{
                height: 180,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderWidth: 0,
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4,
              }}
            />
         </TouchableOpacity>
          </Card>
          <View
            style={{
              width: '88%',
              alignSelf: 'center',
              flex: 1,
              paddingLeft:wp(4)
            }}>
            <Text variant="titleLarge" style={[globalestyles.marginTopM,globalestyles.Weight600]}>
            <Text variant="bodyLarge" style={[globalestyles.bodyLarge,globalestyles.Weight600]}>
            {property.title}
            </Text>
            </Text>
            <Text variant="bodyLarge" style={[globalestyles.bodyLarge,globalestyles.marginTopS]}>
              {property.size} m²
              <Text style={{fontSize: 40, lineHeight: 0}}>{' '}.{' '}</Text>
              {property.workshop} piéces
              <Text style={{fontSize: 40, lineHeight: 0}}>{' '}.{' '}</Text>
              {property.rooms} chambre(s)
            </Text>
            <Text variant="titleLarge" style={[globalestyles.Weight600]}>
            {property.price.toLocaleString('fr-FR')} XOF
            </Text>
            <Text variant="bodyLarge" style={[globalestyles.bodyLarge,globalestyles.marginTopS]}>
              {property.city}
              <Text style={{fontSize: 40, lineHeight: 0}}>{' '}.{' '}</Text>
              {property.neighborhood}
            </Text>
          </View>
          <View style={{width: '88%',
              alignSelf: 'center', }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                left: wp(4),
                top: wp(-40),
                width: 180,
                height: 22,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  width: '45%',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 6,
                  justifyContent: 'center',
                }}>
                <Text>{property.nbPicture}</Text>
                <Image
                  style={{marginLeft: 10}}
                  source={require('../../../assets/photo.png')}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  width: '45%',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 6,
                  justifyContent: 'center',
                }}>
                <Text>{property.video}</Text>
              </View>
            </View>
            <TouchableOpacity>
            <View
              style={{
                left: wp(65),
                top: wp(-40),
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: 38,
                flex: 1,
                justifyContent: 'center',
                backgroundColor:'#FFF',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 8,
              }}>
              <Image source={require('../../../assets/basket.png')} />
            </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FavoriteHouseCard;
{
  /* <Text variant="titleLarge" style={{fontWeight: '500'}}>
              {property.price}
            </Text>
            <Text variant="titleSmall" style={globalestyles.marginTopS}>
              {property.title}
            </Text>
            <Text variant="bodySmall">
              {property.size} . {property.workshop} {property.rooms}
            </Text>
            <Text variant="bodySmall" style={globalestyles.marginTopS}>
              {property.city} {property.neighborhood}
            </Text> */
}

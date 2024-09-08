import React from 'react';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
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
  title: string;
  city: string;
  neighborhood: string;
  size: number;
  workshop: number;
  price: number;
  vues: number;
}

const NewHouseCard = ({data}: {data: Property[]}) => {
  const navigation = useNavigation();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      {data.map((property: Property) => (
        <TouchableOpacity
          key={property.id}
          onPress={() => navigation.navigate(property.routeName as never)}
          style={globalestyles.marginTopM}>
          <Card
            style={{
              width: wp(51),
              marginRight: 20,
              flexShrink: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderWidth: 0,
              backgroundColor: 'white',
              shadowOpacity: 0,
              shadowColor: 'white',
              shadowOffset: {width: 0.1, height: 0.1},
              shadowRadius: 0,
            }}>
            <Card.Cover
              source={{uri: property.Web}}
              style={{
                height: 123.53,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderWidth: 0,
              }}
            />
          </Card>
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              marginTop: 10,
              paddingBottom: 10,
            }}>
            <Text variant="titleMedium" style={globalestyles.Weight600}>
              {property.title}{' '}
              <Text style={{color: '#E97400', fontSize: 40, lineHeight: 0}}>{' '}.{' '}</Text>
              {property.workshop} piéces
            </Text>
            <Text variant="bodyLarge" style={{marginVertical: wp(1)}}>
            {property.city}
              <Text style={{fontSize: 40, lineHeight: 0}}>{' '}.{' '}</Text>
              {property.neighborhood}
            </Text>
            <Text variant="titleMedium" style={globalestyles.Weight600}>
            {property.price.toLocaleString('fr-FR')} XOF
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    /*
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
      {data.map((property: Property) => (
          <TouchableOpacity
          key={property.id}
          onPress={() => navigation.navigate(property.routeName as never)}  
          style={globalestyles.marginTopM}>
            <Card
              style={{
                width: wp(51),
                marginRight: 20,
                flexShrink: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderWidth: 0,
                backgroundColor: 'white',
                shadowOpacity: 0,
                shadowColor: 'white',
                shadowOffset: {width: 0.1, height: 0.1},
                shadowRadius: 0
              }}>
              <Card.Cover
                source={{uri: property.Web}}
                style={{
                  height: 123.53,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderWidth: 0,
                }}
              />
            </Card>
            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                marginTop: 10,
                paddingBottom: 10,
              }}>
              <Text variant="titleMedium" style={globalestyles.Weight600}>{property.title}</Text>
              <Text variant="bodySmall" style={{marginVertical:wp(1)}}>
                {property.size} m² . {property.workshop} piéces
              </Text>
              <Text variant="bodySmall">{property.neighborhood}, <Text style={globalestyles.colorprimary}>{property.city}</Text></Text>
              <Text variant="titleSmall" style={globalestyles.Weight600}>
                {property.price} XOF
              </Text>
            </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',width: 88,height: 24,flexShrink:0,backgroundColor:'#FAFAFA',borderRadius:30}}>
              <Image source={require('../../../assets/Eye.png')} style={{marginRight:10}}/>
              <Text>{property.vues}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView> */
  );
};

export default NewHouseCard;

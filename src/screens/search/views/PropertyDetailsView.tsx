// PropertyDetailsView
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Text} from 'react-native-paper';
import {propertiesData} from '../../../utils/types';
import VisitButton from '../../../components/Buttons/VisitButton';
import RdvButton from '../../../components/Buttons/RdvButton';
import MapScreen from '../MapScreen';
import globalestyles from '../../../../GolbaleStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type Props = {
  propertiesDetail: propertiesData;
  amenities: Array<{
    title: string;
    status: boolean;
    image: any;
    activeImage: any;
  }>;
  latitude: any;
  longitude: any;
  advertisersLogos: {[key: string]: string};
  navigation: any;
};

export const PropertyDetailsView: React.FC<Props> = ({
  propertiesDetail,
  amenities,
  latitude,
  longitude,
  advertisersLogos,
  navigation,
}) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <ScrollView horizontal pagingEnabled>
            {propertiesDetail.images.map((image, index) => (
              <Image key={index} source={{uri: image}} style={styles.image} />
            ))}
          </ScrollView>
          <TouchableOpacity
            style={globalestyles.backArrow}
            onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
              <Image source={require('../../../assets/images/backArrow.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[globalestyles.paddingLeft, globalestyles.marginTopM]}>
          <Text variant="titleLarge" style={globalestyles.Weight600}>
            {propertiesDetail.operation_type} : {propertiesDetail.property_name}
          </Text>
          <Text
            variant="bodyLarge"
            style={[globalestyles.marginTopS, globalestyles.Weight600]}>
            {propertiesDetail.area} m²
            <Text style={styles.dot}>. </Text>
            {propertiesDetail.nb_rooms} piéces
            <Text style={styles.dot}>. </Text>
            {propertiesDetail.nb_bedrooms} chambre(s)
          </Text>
          <Text style={globalestyles.bodyLarge}>
            {propertiesDetail.neighborhood}, {propertiesDetail.city}
          </Text>
          <View style={globalestyles.marginTopS}>
            <Text variant="titleLarge" style={globalestyles.Weight600}>
              {propertiesDetail.price.toLocaleString('fr-FR')} XOF
            </Text>
          </View>
          <View style={globalestyles.marginTopM}>
            <View style={styles.buttonContainer}>
              <VisitButton pId={propertiesDetail.id} />
              <RdvButton />
            </View>
          </View>
          <Text
            variant="titleMedium"
            style={[globalestyles.Weight600, globalestyles.marginTopM]}>
            A propos de la propriété
          </Text>
          <View style={{width: '95%'}}>
            <Text style={globalestyles.marginTopS}>
              {propertiesDetail.property_description}
            </Text>
          </View>
          <Text
            variant="titleMedium"
            style={[globalestyles.Weight600, globalestyles.marginTopM]}>
            Caractéristiques
          </Text>
          <View style={[globalestyles.marginTopS]}>
            <View style={styles.amenitiesContainer}>
              {amenities
                .filter(amenity => amenity.status)
                .map((amenity, index) => (
                  <View key={index} style={styles.amenity}>
                    <Image source={amenity.image} />
                    <Text>{amenity.title}</Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
        <View style={globalestyles.marginTopL}>
          <MapScreen lat={latitude} long={longitude} />
        </View>
        <View style={[globalestyles.paddingLeft, globalestyles.marginTopM]}>
          <Text variant="titleMedium" style={[globalestyles.Weight600]}>
            Logemment proposé par
          </Text>
          <View style={globalestyles.marginTopS}>
          <TouchableOpacity   onPress={() => navigation.navigate('AgentProfileScreen', { advertiserId: propertiesDetail.advertisers_id })}
>
            <View
              style={{
                display: 'flex',
                borderColor: 'red',
                width: 160,
                height: 80,
                padding: wp(5),
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
                borderRadius: 6,
                backgroundColor: '#FFF',
                shadowOffset: {width: 0, height: 0.1},
                shadowOpacity: 0.1,
              }}>
                {advertisersLogos[propertiesDetail.advertisers_id] ? (
                  <Image
                    source={{
                      uri: advertisersLogos[propertiesDetail.advertisers_id],
                    }}
                    style={{minWidth: wp(22), minHeight: hp(4)}}
                    resizeMode="contain"
                  />
                ) : (
                  <Text
                    variant="labelMedium"
                    style={[globalestyles.colorprimary]}>
                    Particulier
                  </Text>
                )}
            </View>
            </TouchableOpacity>
            <View style={globalestyles.marginTopL}>

            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: wp(100),
    height: hp(40),
  },
  backButton: {
    backgroundColor: '#fff',
    width: 37,
    height: 37,
    borderRadius: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    fontSize: 40,
    lineHeight: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenity: {
    width: '18%',
    alignItems: 'center',
  },
});

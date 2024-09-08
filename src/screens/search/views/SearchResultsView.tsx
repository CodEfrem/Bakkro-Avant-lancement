import React from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { propertiesData } from '../../../utils/types';
import AddRemoveToFavorites from '../../../components/Buttons/AddRemoveToFavorites';
import Header from '../../../components/Header';
import globalestyles from '../../../../GolbaleStyle';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  propertiesData: propertiesData[];
  advertisersLogos: { [key: string]: string };
  handlePropertiesPress: (properties: propertiesData) => void;
  userId: string;
  navigation: any;
};

export const SearchResultsView: React.FC<Props> = ({
  propertiesData,
  advertisersLogos,
  handlePropertiesPress,
  userId,
  navigation,
}) => {
  return (
    <>
      <Header title={`Résultats (${propertiesData.length})`} />
      <TouchableOpacity
        style={globalestyles.backArrowMain}
        onPress={() => navigation.navigate('SearchScreen' as never)}
      >
        <Image source={require('../../../assets/images/backArrow.png')} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', width: wp(92), justifyContent: 'flex-end' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Map', { propertiesData })}>
          <Text
            variant="bodyLarge"
            style={[
              globalestyles.bodyLarge,
              globalestyles.Weight500,
              globalestyles.marginTopS,
              globalestyles.colorprimary,
            ]}
          >
            Voir sur la carte
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{ position: 'relative', paddingTop: wp(5) }}>
          <FlatList
            data={propertiesData}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ position: 'relative', paddingTop: wp(5) }}>
                <Card style={{ width: '88%', alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}></View>
                  <TouchableOpacity onPress={() => handlePropertiesPress(item)}>
                    <Card.Cover
                      source={{ uri: item.images[0] }}
                      style={{ height: 200, borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                    />
                  </TouchableOpacity>
                </Card>
                <View style={{ width: '88%', alignSelf: 'center', flex: 1, paddingLeft: wp(4) }}>
                  <Text
                    variant="titleLarge"
                    style={[globalestyles.Weight600, globalestyles.marginTopS]}
                  >
                    {item.price.toLocaleString('fr-FR')} XOF
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={[globalestyles.bodyLarge, globalestyles.Weight500, globalestyles.marginTopXS]}
                  >
                    {item.property_name}
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={[globalestyles.bodyLarge, globalestyles.marginTopS, , globalestyles.Weight500]}
                  >
                    {item.area} m²
                    <Text style={{ fontSize: 40, lineHeight: 0 }}>.</Text>
                    {item.nb_rooms} piéces
                    <Text style={{ fontSize: 40, lineHeight: 0 }}>.</Text>
                    {item.nb_bedrooms} chambre(s)
                  </Text>
                  <Text variant="bodyLarge" style={[globalestyles.bodyLarge]}>
                    {item.neighborhood}, {item.city}
                  </Text>
                </View>
                <View style={{ width: '88%', alignSelf: 'center' }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      left: wp(4),
                      top: wp(-38),
                      width: 180,
                      height: 22,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        height: '100%',
                        width: '45%',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 6,
                        justifyContent: 'center',
                      }}
                    >
                      <Text variant="bodySmall">{item.video_type}</Text>
                    </View>
                  </View>
                  <AddRemoveToFavorites
                    route={{
                      key: 'unique-key',
                      name: 'propertiesDetail',
                      params: { properties: item },
                    }}
                    id={userId}
                  />
                  <View style={[globalestyles.paddingLeft, globalestyles.advitiserLogoContainer]}>
                    <View
                      style={{
                        bottom: wp(85),
                        position: 'absolute',
                        marginLeft: wp(5),
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          borderColor: 'red',
                          width: 100,
                          height: 60,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexShrink: 0,
                          borderRadius: 10,
                          backgroundColor: '#FFF',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 2,
                        }}
                      >
                        {advertisersLogos[item.advertisers_id] ? (
                          <Image
                            source={{ uri: advertisersLogos[item.advertisers_id] }}
                            style={{ minWidth: wp(22), minHeight: hp(4) }}
                            resizeMode="contain"
                          />
                        ) : (
                          <Text
                            variant="labelMedium"
                            style={[globalestyles.colorprimary]}
                          >
                            Particulier
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
};

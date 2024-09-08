import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, LatLng} from 'react-native-maps';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {Card, Text} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import globalestyles from '../../../GolbaleStyle';
import AddRemoveToFavorites from '../../components/Buttons/AddRemoveToFavorites';
import { RootStackParamList, propertiesData } from '../../utils/types';

interface Area {
  title: string;
  status: boolean;
  coordinate: LatLng;
  property?: propertiesData;
}

const MapResultScreen = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [selectedArea, setSelectedArea] = React.useState<Area | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'propertiesDetail'>>();
  const navigation = useNavigation();

  const { propertiesData } = route.params;

  const geographicalAreasData = propertiesData.map((property: propertiesData) => ({
    title: property.property_name,
    status: false,
    coordinate: {
      latitude: property.location_gps[0],
      longitude: property.location_gps[1],
    },
    property,
  }));

  const mapRef = React.useRef<MapView>(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleMarkerPress = (area: Area) => {
    setSelectedArea(area);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handlepropertiesPress = (properties: propertiesData) => {
    setVisible(false);
    navigation.navigate('propertiesDetail', {properties});
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Image
          source={require('../../assets/images/closeMark.png')}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: 5.359951,
          longitude: -4.008256,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onMapReady={() => console.log('Map is ready')}
        onRegionChangeComplete={region =>
          console.log('Region changed:', region)
        }>
        {geographicalAreasData.map((area: Area) => (
          <Marker
            key={area.property.id} // Use a unique identifier for the key
            coordinate={area.coordinate}
            title={area.title}
            pinColor="#E97400"
            onPress={() => handleMarkerPress(area)}
          />
        ))}
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
        <TouchableOpacity onPress={() => handlepropertiesPress(selectedArea.property)}>

            <View>
              {selectedArea && (
                <Card style={styles.card}>
                  <Card.Cover
                    source={{uri: selectedArea.property.images[0]}}
                    style={styles.cover}
                  />
                  <View style={{left: wp(65), top: wp(5)}}>
                    <AddRemoveToFavorites
                      route={{
                        key: 'unique-key',
                        name: 'propertiesDetail',
                        params: { properties: selectedArea.property },
                      }}
                      id={"rtyuiosnd;"}
                    />
                  </View>
                  <Card.Content>
                    <Text  variant="titleMedium" style={[globalestyles.colorprimary, globalestyles.marginTopS,globalestyles.Weight600]}>{selectedArea.property.price.toLocaleString('fr-FR')} XOF</Text>
                    {/* <Text>{selectedArea.property.neighborhood}</Text> */}
                    <Text style={globalestyles.marginTopS}>
                      {selectedArea.property.operation_type} - {selectedArea.property.property_name} 
                    </Text>
                    <Text style={globalestyles.marginTopXS}>
                      {selectedArea.property.area}m² - {selectedArea.property.nb_rooms} piece(s) - {selectedArea.property.nb_bedrooms} chambre(s)
                    </Text>
                    <TouchableOpacity onPress={handleCloseModal}>
                      <View>
                        <Text style={[globalestyles.marginTopXS, globalestyles.Weight600]}>Fermer</Text>
                      </View>
                    </TouchableOpacity>
                  </Card.Content>
                </Card>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 999,
    backgroundColor: 'white',
    padding: 10,
  },
  backButtonImage: {
    width: 20,
    height: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: hp(10),
  },
  card: {
    width: wp(96),
    backgroundColor: 'white',
  },
  cover: {
    height: wp(35),
  }
});

export default MapResultScreen;

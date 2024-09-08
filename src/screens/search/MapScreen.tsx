// MapScreen.tsx

import React from 'react';
import {View,} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';

interface Area {
    coordinate: LatLng;
}

interface MapScreenProps {
    lat: number;
    long: number;
}

const MapScreen: React.FC<MapScreenProps> = ({ lat, long }) => {
    const [geographicalAreasData, setGeographicalAreasData] = React.useState<Area[]>([
        {coordinate: { latitude: lat, longitude: long } },
    ]);

    const mapRef = React.useRef<MapView>(null);

    React.useEffect(() => {
        console.log('MapScreen Mounted');
    }, []);

    return (
        <View style={{ flex: 1}}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={{ width: '90%', height: wp(50), alignSelf: 'center', paddingTop: 30, borderWidth:2, borderColor:'#FAFAFA',borderRadius:20 }}
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onMapReady={() => console.log('Map is ready')}
                onRegionChangeComplete={(region) => console.log('Region changed:', region)}
            >
                {geographicalAreasData.map((area, index) => (
                    <Marker
                        key={index}
                        coordinate={area.coordinate}
                        pinColor='#FB710E'
                    />
                ))}
            </MapView>
        </View>
    );
};

export default MapScreen;

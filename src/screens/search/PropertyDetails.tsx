// PropertyDetails
import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { supabase } from '../../lib/supabase';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, propertiesData } from '../../utils/types';
import { PropertyDetailsView } from './views/PropertyDetailsView';
import globalestyles from '../../../GolbaleStyle';

type propertiesDetailRouteProp = RouteProp<RootStackParamList, 'propertiesDetail'>;

type Props = {
  route: propertiesDetailRouteProp;
};

const PropertyDetails: React.FC<Props> = ({ route }) => {
  const properties = route.params.properties;
  const propertiesId = properties.id;
  const [propertiesDetail, setPropertiesDetail] = useState<propertiesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [amenities, setAmenities] = useState([
    {
      title: 'Gardien',
      status: false,
      image: require('../../assets/images/Caretaker.png'),
      activeImage: require('../../assets/images/ActiveCaretaker.png'),
    },
    {
      title: 'Jardin',
      status: false,
      image: require('../../assets/images/Garden.png'),
      activeImage: require('../../assets/images/ActiveGarden.png'),
    },
    {
      title: 'Parking',
      status: false,
      image: require('../../assets/images/Parking.png'),
      activeImage: require('../../assets/images/ActiveParking.png'),
    },
    {
      title: 'Meublé',
      status: false,
      image: require('../../assets/images/Furnished.png'),
      activeImage: require('../../assets/images/ActiveFurnished.png'),
    },
    {
      title: 'Piscine',
      status: false,
      image: require('../../assets/images/Pool.png'),
      activeImage: require('../../assets/images/ActivePool.png'),
    },
    {
      title: 'Ascenceur',
      status: false,
      image: require('../../assets/images/Elevator.png'),
      activeImage: require('../../assets/images/ActiveElevator.png'),
    },
    {
      title: 'Balcon',
      status: false,
      image: require('../../assets/images/Balcony.png'),
      activeImage: require('../../assets/images/ActiveBalcony.png'),
    },
    {
      title: 'Terrasse',
      status: false,
      image: require('../../assets/images/Terrace.png'),
      activeImage: require('../../assets/images/ActiveTerrace.png'),
    },
    {
      title: 'Belle vue',
      status: false,
      image: require('../../assets/images/View.png'),
      activeImage: require('../../assets/images/ActiveView.png'),
    },
    {
      title: 'Sous-sol',
      status: false,
      image: require('../../assets/images/Basement.png'),
      activeImage: require('../../assets/images/ActiveBasement.png'),
    },
  ]);
  const [latitude, setLatitude] = useState(); // Exemple de latitude
  const [longitude, setLongitude] = useState(); // Exemple de longitude
  const [advertisersLogos, setAdvertisersLogos] = useState<{ [key: string]: string }>({});

  const navigation = useNavigation();

  useEffect(() => {
    console.log('@@@@@ properties');
    
    const fetchPropertiesDetail = async () => {
      try {
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select('*')
          .eq('id', propertiesId)
          .single();

        if (propertyError) {
          throw propertyError;
        }
        setPropertiesDetail(propertyData);

        if (propertyData && propertyData.amenities) {
          const updatedAmenities = amenities.map(amenity => ({
            ...amenity,
            status: propertyData.amenities.includes(amenity.title),
          }));
          setAmenities(updatedAmenities);
        }

        if (propertyData && propertyData.location_gps) {
          setLatitude(propertyData.location_gps[0]);
          setLongitude(propertyData.location_gps[1]);
        }

        const { data: advertiserData, error: advertiserError } = await supabase
          .from('advertiserpremium')
          .select('id, logo')
          .eq('id', propertyData.advertisers_id)
          .single();

        if (advertiserError) {
          throw advertiserError;
        }

        if (advertiserData) {
          setAdvertisersLogos(prevLogos => ({
            ...prevLogos,
            [propertyData.advertisers_id]: advertiserData.logo,
          }));
        }
      } catch (error) {
        console.error('Error fetching properties detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertiesDetail();
  }, [propertiesId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!propertiesDetail) {
    return <Text>Error loading property details</Text>;
  }

  return (
    <View style={globalestyles.body}>
      <PropertyDetailsView
        propertiesDetail={propertiesDetail}
        amenities={amenities}
        latitude={latitude}
        longitude={longitude}
        advertisersLogos={advertisersLogos}
        navigation={navigation}
      />
    </View>
  );
};

export default PropertyDetails;

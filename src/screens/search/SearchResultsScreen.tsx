import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, propertiesData } from '../../utils/types';
import { SearchResultsView } from './views/SearchResultsView';
import globalestyles from '../../../GolbaleStyle';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

type Props = {
  navigation: SearchScreenNavigationProp;
  route: { params: { searchQuery: any; session: any } };
};

const SearchResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const [propertiesData, setPropertiesData] = useState<propertiesData[]>([]);
  const [advertisersLogos, setAdvertisersLogos] = useState<{ [key: string]: string }>({});
  const { searchQuery, session } = route.params;
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (session) {
      getUser();
    }
  }, [session]);

  useEffect(() => {
    if (userId) {
      fetchPropertiesData();
    }
  }, [searchQuery, userId]);

  const fetchPropertiesData = async () => {
    try {
      let query = supabase.from('properties').select('*');

      if (searchQuery.operations) {
        query = query.eq('operation_type', searchQuery.operations);
      }
      if (searchQuery.propertyTypes.length > 0) {
        query = query.in('property_name', searchQuery.propertyTypes);
      }
      if (searchQuery.geographicalAreasData.length > 0) {
        query = query.in('city', searchQuery.geographicalAreasData);
      }
      if (searchQuery.minSurfaceArea > 0) {
        query = query.gte('area', searchQuery.minSurfaceArea);
      }
      if (searchQuery.maxSurfaceArea > 0) {
        query = query.lte('area', searchQuery.maxSurfaceArea);
      }
      if (searchQuery.minBudget > 0) {
        query = query.gte('price', searchQuery.minBudget);
      }
      if (searchQuery.maxBudget > 0) {
        query = query.lte('price', searchQuery.maxBudget);
      }

      const { data: propertiesData, error } = await query.order('created_at', {
        ascending: false,
      });

      if (error) {
        throw error;
      }
      setPropertiesData(propertiesData);

      const advertisersIds = propertiesData.map(property => property.advertisers_id);
      const { data: advertisersData, error: advertisersError } = await supabase
        .from('advertiserpremium')
        .select('id, logo')
        .in('id', advertisersIds);

      if (advertisersError) {
        throw advertisersError;
      }

      const logosMap = advertisersData.reduce((acc, advertiser) => {
        acc[advertiser.id] = advertiser.logo;
        return acc;
      }, {});

      setAdvertisersLogos(logosMap);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  const getUser = async () => {
    try {
      if (!session?.user) throw new Error('Aucun utilisateur dans la session !');
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('phone', session?.user.phone)
        .single();

      if (data) {
        setUserId(data.id);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  const handlePropertiesPress = (properties: propertiesData) => {
    navigation.navigate('propertiesDetail', { properties });
  };

  return (
    <View style={globalestyles.body}>
      <SearchResultsView
        propertiesData={propertiesData}
        advertisersLogos={advertisersLogos}
        handlePropertiesPress={handlePropertiesPress}
        userId={userId}
        navigation={navigation}
      />
    </View>
  );
};

export default SearchResultsScreen;

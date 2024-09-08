import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {supabase} from '../../lib/supabase';
import {RootStackParamList} from '../../utils/types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type propertiesDetailRouteProp = RouteProp<
  RootStackParamList,
  'propertiesDetail'
>;

type Props = {
  route: propertiesDetailRouteProp;
  id: string;
};

const AddRemoveToFavorites: React.FC<Props> = ({route, id}) => {
  const {properties} = route.params;
  const propertiesId = properties.id;
  const [isFavorite, setIsFavorite] = React.useState(false); // État pour suivre si la propriété est dans les favoris
  console.log('@@@@@@@', propertiesId);

  React.useEffect(() => {
    if (propertiesId) {
      checkFavorite();
    }
  }, [propertiesId]);

  // Vérifier si la propriété est dans les favoris
  const checkFavorite = async () => {
    try {
      const {data, error} = await supabase
        .from('user_favoritestest')
        .select()
        .eq('property_id', propertiesId)
        .eq('user_id', id)
        .single();
      if (data) {
        setIsFavorite(true); // Si la propriété est dans les favoris, mettre l'état à true
      }
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const {error} = await supabase
        .from('user_favoritestest')
        .insert([{user_id: id, property_id: propertiesId}]);
      if (error) {
        throw error;
      }
      setIsFavorite(true); // Mettre l'état à true après l'ajout aux favoris
      console.log('Property added to favorites');
    } catch (error) {
      console.error('Error adding property to favorites:', error);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      const {error} = await supabase
        .from('user_favoritestest')
        .delete()
        .eq('property_id', propertiesId)
        .eq('user_id', id);
      if (error) {
        throw error;
      }
      setIsFavorite(false); // Mettre l'état à false après la suppression des favoris
      console.log('');
    } catch (error) {
      console.error('Error removing property from favorites:', error);
    }
  };

  return (
    <View>
      {isFavorite ? ( // Vérifier si la propriété est dans les favoris
        <TouchableOpacity onPress={handleRemoveFromFavorites}>
          <View
            style={{
              left: wp(65),
              top: wp(-40),
              width: 36,
              height: 36,
              flexShrink: 0,
              borderRadius: 38,
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#FFF',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 8,
            }}>
            <Image source={require('../../assets/images/removeFav.png')} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleAddToFavorites}>
          <View
            style={{
              left: wp(65),
              top: wp(-40),
              width: 36,
              height: 36,
              flexShrink: 0,
              borderRadius: 38,
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#FFF',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 8,
            }}>
            <Image source={require('../../assets/images/addFav.png')} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddRemoveToFavorites;
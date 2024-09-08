import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RootStackParamList, propertiesData} from '../../../utils/types';
import {supabase} from '../../../lib/supabase';
import globalestyles from '../../../../GolbaleStyle';
import ActualityCard from '../Actualities/ActualityCard';


const HomeHouseCard = () => {
  const [propertiesData, setPropertiesData] = useState<propertiesData[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchProperties = async () => {
      const {data, error} = await supabase
        .from('properties')
        .select('*')
        .eq('isexceptionproperty', true);

      if (error) {
        console.error('Error fetching data from Supabase:', error);
      } else {
        // Map the data to fit the propertiesData interface
        const formattedData = data.map((property: any) => ({
          id: property.id,
          images: property.images,
          mainimage: property.mainimage,
          operation_type: property.operation_type,
          property_name: property.property_name,
          city: property.city,
          neighborhood: property.neighborhood,
          nb_bedrooms: property.nb_bedrooms,
          nb_rooms: property.nb_rooms,
          area: property.area,
          price: property.price,
          nb_views: property.nb_views,
          advertiser: property.advertiser,
          video_type: property.video_type,
          property_description: property.property_description,
          advertisers_id: property.advertisers_id,
        }));
        setPropertiesData(formattedData);
      }
    };

    fetchProperties();
  }, []);

  const dataActualities = [
    {
      id: 1,
      title: "L'état et son patrimoine immobilier",
      content:
        "Côte d'Ivoire: l'État va faire l'inventaire de son patrimoine immobilier",
      img: 'https://s.rfi.fr/media/display/317d6204-8659-11eb-aad0-005056bff430/w:980/p:16x9/INP-HB%20de%20Yamoussokro_Cr%C3%A9dit%20photo_INP-HB%20de%20Yamoussokro%20OK.webp',
      Web: 'https://my.matterport.com/show/?m=jm5WwEA3HUN&log=0&help=0&nt=0&play=0&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1',
    },
    {
      id: 2,
      title: 'Salon de l’immobilier de Côte d’Ivoire',
      content:
        'Salon de l’immobilier de Côte d’Ivoire : Le ministère de la Construction félicite les organisateurs',
      img: 'https://bunny-wp-pullzone-vil2btjhll.b-cdn.net/wp-content/uploads/2024/03/Ministere-de-la-Construction-immobilier-1140x570.jpeg',
      Web: 'https://www.afrique-sur7.ci/salon-de-limmobilier-de-cote-divoire-le-ministere-de-la-construction-felicite-les-organisateurs',
    },
    {
      id: 3,
      title: '300 000 logements à Assinie',
      content: 'Ville nouvelle du grand Abidjan, 300 000 logements à Assinie',
      img: 'https://bunny-wp-pullzone-vil2btjhll.b-cdn.net/wp-content/uploads/2023/10/ville_nouvelle_du_grand_abidjan.jpeg',
      Web: "https://www.afrique-sur7.ci/494161-ville-nouvelle-du-grand-abidjan-300-000-logements-construits-a-assinie#:~:text=La%20C%C3%B4te%20d'Ivoire%20annonce,situ%C3%A9e%20%C3%A0%20proximit%C3%A9%20d'Abidjan",
    },
    {
      id: 4,
      title: 'Investisseurs immobiliers',
      content:
        'Logement, une masterclass bientôt pour les investisseurs immobiliers à abidjan',
      img: 'https://www.7info.ci/wp-content/uploads/2024/02/immobilier-670x348.jpg',
      Web: 'https://www.7info.ci/logement-une-masterclass-bientot-pour-les-investisseurs-immobiliers-a-abidjan/',
    },
  ];

  const handlePropertiesPress = (property: propertiesData) => {
    console.log('Navigating to propertiesDetail with property:', property);
    navigation.navigate('propertiesDetail', { properties: property });
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{maxHeight: hp(40)}}>
        {propertiesData.map((property) => (
          <TouchableOpacity
            key={property.id}
            onPress={() => handlePropertiesPress(property)}>
            <View style={styles.imageContainer}>
              <Image source={{uri: property.images[0]}} style={styles.image} />
              <View style={styles.textContainer}>
                <Text
                  variant="bodyLarge"
                  style={[globalestyles.TitleMedium, globalestyles.Weight600]}>
                  {property.property_name}
                </Text>
                <Text style={[globalestyles.Weight500]}>
                  {property.neighborhood}, {property.city}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={[globalestyles.marginTopL]}>
        <Text variant="titleLarge" style={globalestyles.Weight500}>
          Les actualités
        </Text>
      </View>
      <ActualityCard data={dataActualities} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative', // Permet de positionner les enfants absolus par rapport à ce conteneur
  },
  image: {
    width: wp(92),
    paddingLeft: wp(4), // Utilisez les fonctions de dimensionnement pour garantir l'évolutivité
    height: 350, // Ajustez la hauteur de l'image selon vos besoins
    resizeMode: 'cover', // Ajustez la méthode de redimensionnement selon vos besoins
  },
  textContainer: {
    position: 'absolute',
    paddingVertical: hp(1.5),
    left: 0,
    right: 0,
    top: hp(28), // Place le texte à 20px du bas
    paddingHorizontal: 10, // Ajoute un peu d'espace autour du texte
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond semi-transparent pour le texte
    maxWidth: wp(85),
  },
});

export default HomeHouseCard;

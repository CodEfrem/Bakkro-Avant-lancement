import React, { useState, useContext } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles'; // Importation des styles spécifiques à ce composant
import globalestyles from '../../../GolbaleStyle'; // Importation des styles globaux
import Header from '../../components/Header'; // Importation du composant d'en-tête
import CustomButton from '../../components/Buttons/Buttons';
import SessionContext from '../../utils/SessionContext';
import OperationSection from './views/OperationSection'
import PropertyTypeSection from './views/PropertyTypeSection';
import GeographicalAreasSection from './views/GeographicalAreasSection';
import SurfaceAreaSection from './views/SurfaceAreaSection';
import BudgetSection from './views/BudgetSection';
import AmenitiesSection from './views/AmenitiesSection';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SearchFilterScreen = () => {
  const { session } = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // Déclaration des états pour les différents filtres
  const [operations, setOperations] = useState([
    { label: 'Acheter', value: 'Achat', status: false }, // Filtrer par achat
    { label: 'Louer', value: 'Location', status: false }, // Filtrer par location
  ]);

  const [propertyTypes, setPropertyTypes] = useState([
    { label: 'Appartement', value: 'Appartement', status: false }, // Type d'appartement
    { label: 'Maison et Villa', value: 'Maison et Villa', status: false }, // Type de maison ou villa
  ]);

  const [geographicalAreasData, setGeographicalAreasData] = useState([
    // Zones géographiques
    { title: 'Abobo', status: false },
    { title: 'Adjamé', status: false },
    { title: 'Bingerville', status: false },
    { title: 'Anyama', status: false },
    { title: 'Attécoubé', status: false },
    { title: 'Koumassi', status: false },
    { title: 'Treichville', status: false },
    { title: 'Port bouët', status: false },
    { title: 'Cocody', status: false },
    { title: 'Marcory', status: false },
    { title: 'Songon', status: false },
    { title: 'Yopougon', status: false },
    { title: 'Plateau', status: false },
  ]);

  const [amenities, setAmenities] = useState([
    { title: 'Gardien', status: false, image: require('../../assets/images/Caretaker.png'), activeImage: require('../../assets/images/ActiveCaretaker.png') },
    { title: 'Jardin', status: false, image: require('../../assets/images/Garden.png'), activeImage: require('../../assets/images/ActiveGarden.png') },
    { title: 'Parking', status: false, image: require('../../assets/images/Parking.png'), activeImage: require('../../assets/images/ActiveParking.png') },
    { title: 'Meublé', status: false, image: require('../../assets/images/Furnished.png'), activeImage: require('../../assets/images/ActiveFurnished.png') },
    { title: 'Piscine', status: false, image: require('../../assets/images/Pool.png'), activeImage: require('../../assets/images/ActivePool.png') },
    { title: 'Ascenceur', status: false, image: require('../../assets/images/Elevator.png'), activeImage: require('../../assets/images/ActiveElevator.png') },
    { title: 'Balcon', status: false, image: require('../../assets/images/Balcony.png'), activeImage: require('../../assets/images/ActiveBalcony.png') },
    { title: 'Terrasse', status: false, image: require('../../assets/images/Terrace.png'), activeImage: require('../../assets/images/ActiveTerrace.png') },
    { title: 'Belle vue', status: false, image: require('../../assets/images/View.png'), activeImage: require('../../assets/images/ActiveView.png') },
    { title: 'Sous-sol', status: false, image: require('../../assets/images/Basement.png'), activeImage: require('../../assets/images/ActiveBasement.png') },
  ]);

  const [minSurfaceAreaVal, setMinSurfaceAreaVal] = useState(0); // Surface minimale
  const [maxSurfaceAreaVal, setMaxSurfaceAreaVal] = useState(0); // Surface maximale

  const [minBudget, setMinBudget] = useState(0); // Budget minimum
  const [maxBudget, setMaxBudget] = useState(0); // Budget maximum

  const handleOperationClick = index => {
    const updatedOperations = operations.map((op, i) => ({
      ...op,
      status: i === index ? !op.status : false,
    }));
    setOperations(updatedOperations);
  };

  const handlePropertyTypeClick = index => {
    const updatedPropertyTypes = propertyTypes.map((type, i) => {
      if (i === index) {
        return { ...type, status: !type.status };
      }
      return type;
    });
    setPropertyTypes(updatedPropertyTypes);
  };

  const handleTagClick = index => {
    const updatedGeographicalAreasData = geographicalAreasData.map((tag, i) => {
      if (i === index) {
        return { ...tag, status: !tag.status };
      }
      return tag;
    });
    setGeographicalAreasData(updatedGeographicalAreasData);
  };

  const handleSurfaceAreaChange = (value, isMinSurface) => {
    const newValue = value.replace(/[^0-9]/g, '');
    if (isMinSurface) {
      setMinSurfaceAreaVal(parseInt(newValue));
    } else {
      setMaxSurfaceAreaVal(parseInt(newValue));
    }
  };

  const handleBudgetChange = (value, isMinBudget) => {
    const newValue = value.replace(/[^0-9]/g, '');
    if (isMinBudget) {
      setMinBudget(parseInt(newValue));
    } else {
      setMaxBudget(parseInt(newValue));
    }
  };

  const handleAmenityClick = index => {
    setAmenities(prevAmenities => {
      const newAmenities = [...prevAmenities];
      newAmenities[index].status = !newAmenities[index].status;
      return newAmenities;
    });
  };

  const searchQuery = {
    operations: '', 
    propertyTypes: [], 
    numberOfRooms: 0, 
    numberOfPieces: 0, 
    price: 0, 
    geographicalAreasData: [],
    minSurfaceArea: minSurfaceAreaVal,
    maxSurfaceArea: maxSurfaceAreaVal,
    minBudget: minBudget,
    maxBudget: maxBudget,
  };

  const handleApplyFilters = () => {
    const selectedCities = geographicalAreasData
      .filter(city => city.status)
      .map(city => city.title);

    searchQuery.geographicalAreasData = selectedCities;

    searchQuery.propertyTypes = propertyTypes
      .filter(propertyType => propertyType.status)
      .map(propertyType => propertyType.value);

    searchQuery.operations = operations.find(op => op.status)?.value || '';

    navigation.navigate('SearchResultsScreen', { searchQuery, session });
  };

  const navigation = useNavigation();

  const isAnyOperationSelected = () => {
    return operations.some(op => op.status);
  };

  const navigateToSearchResults = () => {
    if (isAnyOperationSelected()) {
      handleApplyFilters();
    } else {
      Alert.alert('Aucune opération sélectionnée. Veuillez sélectionner une opération avant de continuer.');
    }
  };

  return (
    <View style={styles.bodyContainer}>
      <Header title="Nouvelle recherche" />
      <TouchableOpacity
        style={globalestyles.backArrowMain}
        onPress={() => navigation.navigate('SearchScreen')}>
        <Image source={require('../../assets/images/backArrow.png')} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalestyles.paddingLeft}>
          <OperationSection 
            operations={operations} 
            handleOperationClick={handleOperationClick} 
          />
          <PropertyTypeSection 
            propertyTypes={propertyTypes} 
            handlePropertyTypeClick={handlePropertyTypeClick} 
          />
          <GeographicalAreasSection 
            geographicalAreasData={geographicalAreasData} 
            handleTagClick={handleTagClick} 
          />
          <SurfaceAreaSection 
            minSurfaceAreaVal={minSurfaceAreaVal} 
            handleSurfaceAreaChange={handleSurfaceAreaChange} 
          />
          <BudgetSection 
            maxBudget={maxBudget} 
            handleBudgetChange={handleBudgetChange} 
          />
        </View>
        <View style={globalestyles.marginTopM}>
          <TouchableOpacity onPress={toggleDropdown}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp(48),
              }}>
              <Text variant="titleMedium"> Voir plus de critères</Text>
              {isOpen ? (
                <Image source={require('../../assets/images/TopArrow.png')} />
              ) : (
                <Image source={require('../../assets/images/DownArrow.png')} />
              )}
            </View>
          </TouchableOpacity>
          {isOpen && (
            <AmenitiesSection 
              amenities={amenities} 
              handleAmenityClick={handleAmenityClick} 
            />
          )}
        </View>
        <View style={globalestyles.marginTopXXL}></View>
        <View style={globalestyles.marginTopXXL}></View>
        <CustomButton
          buttonText="Rechercher"
          onPress={navigateToSearchResults}
        />
      </ScrollView>
    </View>
  );
};

export default SearchFilterScreen;

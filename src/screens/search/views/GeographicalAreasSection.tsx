import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from '../Styles'; // Importation des styles spécifiques à ce composant
import globalestyles from '../../../../GolbaleStyle';
import { Text } from 'react-native-paper';


const GeographicalAreasSection = ({ geographicalAreasData, handleTagClick }) => {
  return (
    <View>
      <Text variant="titleMedium" style={globalestyles.marginTopL}>
        Zones géographiques
      </Text>
      <View style={globalestyles.marginTopM}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {geographicalAreasData.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={[tag.status === false ? styles.inactiveTag : styles.activeTag]}
              onPress={() => handleTagClick(index)}>
              <Text style={tag.status === false ? styles.tagText : styles.activeTagText}>
                {tag.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default GeographicalAreasSection;

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '../Styles';
import globalestyles from '../../../../GolbaleStyle'; // Importation des styles spécifiques à ce composant

const OperationSection = ({ operations, handleOperationClick }) => {
  return (
    <View>
      <Text variant="titleMedium" style={globalestyles.marginTopL}>
        Quel est votre projet ?
      </Text>
      <View style={globalestyles.marginTopM}>
        <View style={{ flexDirection: 'row' }}>
          {operations.map((operation, index) => (
            <TouchableOpacity
              key={index}
              style={[
                operation.status === false ? styles.inactiveTag : styles.activeTag,
              ]}
              onPress={() => handleOperationClick(index)}>
              <Text
                style={operation.status === false ? styles.tagText : styles.activeTagText}>
                {operation.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default OperationSection;

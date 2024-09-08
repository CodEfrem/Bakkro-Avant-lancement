import React = require('react');
import { createStackNavigator } from '@react-navigation/stack';
import VisitProposalPage from './Viste';
import VideoPage from './VideoPage';

const VisitStack = createStackNavigator();

const VisitStackNavigator: React.FC = () => {
  return (
    <VisitStack.Navigator initialRouteName="VisitProposalPage">
      <VisitStack.Screen
        name="VisitProposalPage"
        component={VisitProposalPage}
        options={{ title: 'Proposition de Visite' }}
      />
      <VisitStack.Screen
        name="VideoPage"
        component={VideoPage}
        options={{ title: 'Vidéo 3D' }}
      />
    </VisitStack.Navigator>
  );
};

export default VisitStackNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import Inscription from './src/components/Inscription';
import Connexion from './src/components/Connexion';
import Home from './src/components/Home';
import Profile from './src/components/Profile';
import Settings from './src/components/Settings';
import DeleteConfirm from './src/components/DeleteConfirm';
import Snap from './src/components/Snap';
import SnapUserList from './src/components/SnapUserList';
import Snaplist from './src/components/Snaplist';

const Stack = createNativeStackNavigator();

const App = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Snap" component={Snap} />
        <Stack.Screen name="Snaplist" component={Snaplist} />
        <Stack.Screen name="SnapUserList" component={SnapUserList} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Delete" component={DeleteConfirm} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="Connexion" component={Connexion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

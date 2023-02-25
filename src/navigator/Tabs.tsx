import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Navigator} from './Navigator';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={Navigator} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
    </Tab.Navigator>
  );
};

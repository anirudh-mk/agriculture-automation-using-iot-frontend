import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from './UserScreen';
import StatisticScreen from './StatisticScreen';
import HomeScreen from './HomeScreen';
const Tab = createStackNavigator();

const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position:"absolute",
    bottom:0,
    right:0,
    left:0,
    height:80,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    background: '#fff'
  },
}

const MainScreen = () => {
  return (
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={screenOptions}
      >
        <Tab.Screen 
          name="Home" 
          component={ HomeScreen } 
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons 
              name="home" 
              color={ focused? colors.primary: colors.gray } 
              size={ focused? 30: 26 } />
            ),
          }}
        />
        <Tab.Screen
          name="Statistics"
          component={ StatisticScreen }
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons 
              name='finance' 
              color={ focused? colors.primary: colors.gray } 
              size={ focused? 30: 26 }/>
            ),
          }}
        />
        <Tab.Screen 
          name="User" 
          component={ UserScreen } 
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons 
              name="account" 
              color={ focused? colors.primary: colors.gray } 
              size={ focused? 30: 26} />
            ),
          }}
        />
      </Tab.Navigator>
  )
}

export default MainScreen
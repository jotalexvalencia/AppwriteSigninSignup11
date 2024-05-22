import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Signup from '../screens/Signup'
import Login from '../screens/Login'
import Home from '../screens/Home'


export type AuthStackParamList = {
    Signup: undefined;
    Login: undefined;
    Home: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign:'center',
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}


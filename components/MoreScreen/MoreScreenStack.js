import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MoreScreen from '../../screens/MoreScreen'
import Profile from '../../screens/Profile'
import ChangePasswordScreen from '../../screens/ChangePasswordScreen'


const Stack = createStackNavigator()
export default function MoreScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit Profile" component={Profile} />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    </Stack.Navigator>
  )
}
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import AddMusicCollection from '../screens/AddMusicCollection';
import SearchMusicListDetails from '../screens/MusicSearchListDetails';
import MusicCollectionDetails from '../screens/MusicCollectionDetails';

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#101010'
          },
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTintColor: '#ffd700',
          headerBackTitleVisible: false
        }}
        headerMode='float'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name='AddMusicCollection'
          component={AddMusicCollection}
          options={{ title: 'Add Music Collection' }}
        />
        <Stack.Screen
          name='SearchMusicListDetails'
          component={SearchMusicListDetails}
          options={{ title: 'Search Music Result' }}
        />
        <Stack.Screen
          name='MusicCollectionDetails'
          component={MusicCollectionDetails}
          options={{ title: 'Music Play Screen' }}
        />
      </Stack.Navigator> 
    </NavigationContainer>
  )
}

export default MainStackNavigator;
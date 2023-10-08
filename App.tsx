/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import Welcome from './src/modules/welcome/Welcome';
import Login from './src/modules/login/Login';
import MainTab from './src/modules/mainTab/MainTab';
import ArticleDetail from './src/modules/articleDetail/ArticleDetail';

const Stack = createStackNavigator();

function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#ffffff'}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='welcome'
          screenOptions={{
            cardStyle: { elevation: 1 }
          }}
        >
          <Stack.Screen
            name='welcome'
            component={Welcome}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='login'
            component={Login}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS
            }}
          />
          <Stack.Screen
            name='mainTab'
            component={MainTab}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS
            }}
          />
          <Stack.Screen
            name='ArticleDetail'
            component={ArticleDetail}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

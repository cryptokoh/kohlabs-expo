import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import TerminalScreen from './src/screens/TerminalScreen';
import LabsScreen from './src/screens/LabsScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isFirstLaunch ? "Onboarding" : "Home"}
            screenOptions={{
              headerStyle: {
                backgroundColor: '#000000',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTintColor: '#6366f1',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              cardStyle: { backgroundColor: '#000000' },
            }}
          >
            <Stack.Screen 
              name="Onboarding" 
              component={OnboardingScreen} 
              options={{ headerShown: false }}
              initialParams={{ onComplete: () => setIsFirstLaunch(false) }}
            />
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                title: 'KoH Labs',
                headerShown: false 
              }} 
            />
            <Stack.Screen 
              name="Terminal" 
              component={TerminalScreen} 
              options={{ 
                title: 'Quantum Terminal',
                headerLeft: null,
                gestureEnabled: false
              }} 
            />
            <Stack.Screen 
              name="Labs" 
              component={LabsScreen} 
              options={{ title: 'Research Lab' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
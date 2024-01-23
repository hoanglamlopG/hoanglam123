import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Details } from "./screens"
import { useCallback } from "react";
import BottomTabNavigation from "./navigations/BottomTabNavigation";
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Home from './screens/Home';import AsyncStorage from '@react-native-async-storage/async-storage';
import Cart from './screens/Cart';
import React, { useEffect } from 'react'
const Stack = createNativeStackNavigator()
export default function App() {

  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    getData()
  }, [])
  

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('profile');
      setProfile(JSON.parse(jsonValue))
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const [fontsLoaded] = useFonts({
    black: require("./assets/fonts/Inter-Black.ttf"),
    bold: require("./assets/fonts/Inter-Bold.ttf"),
    regular: require("./assets/fonts/Inter-Regular.ttf"),
    medium: require("./assets/fonts/Inter-Medium.ttf")
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
      initialRouteName={profile != null ? "BottomTabNavigation" : 'Login'}
      >
      
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



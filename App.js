
import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import CameraScreen from "./components/CameraScreen";
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageScreen from "./components/ImageScreen";





export default function App() {

    const Stack = createStackNavigator();
    /*Bruger stack navigator til at vise billeder taget fra app*/
  return(
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name={'home'} component={CameraScreen} options={{headerShown: false}} />
              <Stack.Screen name={'image'} component={ImageScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}

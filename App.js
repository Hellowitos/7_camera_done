
import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import CameraScreen from "./components/CameraScreen";
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageScreen from "./components/ImageScreen";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {

  const StackNavigation = () =>{
    return(
        <Stack.Navigator>
          <Stack.Screen name={'home'} component={CameraScreen} options={{headerShown: false}} />
          <Stack.Screen name={'image'} component={ImageScreen} />
        </Stack.Navigator>
    )
  }

  return(
      <NavigationContainer>
          <Tab.Navigator>
              <Tab.Screen name={'Camera'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="camera" size={20} />),headerShown:false}}/>
          </Tab.Navigator>
      </NavigationContainer>
  )
}

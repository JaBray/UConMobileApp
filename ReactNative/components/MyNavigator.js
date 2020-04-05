import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MyLargeButton from './MyLargeButton';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  DrawerRouter,
  DrawerActions,
} from '@react-navigation/native';
import { DrawerView } from '@react-navigation/drawer';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Animated from 'react-native-reanimated';

// FIRST SHOT AT A CUSTOM NAVIGATOR THAT MIGHT ALLOW MORE CUSTOMIZATION
// TAKES A WHOLE HOST OF ARGUMENTS MOST DOCUMENT IS LOCATED HERE
// https://reactnavigation.org/docs/custom-navigators#usenavigationbuilder

// ITS NOT WORKING RIGHT NOW. ALWAYS RETURNS AN ERROR ABOUT THE STATE.ROUTES
// BEING UNDEFINED

// THE ...REST ARGUMENT MIGHT INCLUDE A LOT OF OPTIONS, CONSOLE.LOG(REST) TO
// SEE WHAT IT CONTAINS
function MyNavigator({
  initialRouteName,
  children,
  drawerContentOptions,
  drawerStyle,
  ...rest
}) {

  // useNavigationBuilder CREATES THE STATE, NAVIGATION AND DESCRIPTOR OBJECTS
  // THESE ARE REQUIRED TO CREATE AND RENDER THE NAVIGATOR
  // ALSO TAKES A ROUTER. WE ARE USING A DEFAULT ROUTER, BUT YOU CAN BUILD A
  // CUSTOM ROUTER
  const { state, navigation, descriptors } = useNavigationBuilder(DrawerRouter, {
    children,
    drawerContentOptions,
    initialRouteName,
  });

  // THIS IS THE FUNCTION THAT CONTOLS THE APPEARING AND REAPPERING OF THE
  // DRAWER. I HARD-CODED THE ARGUMENT '1'. IT SHOULD BE A VARIABLE THAT
  // CONTROLS HOW FAR OUT THE DRAWER IS, BUT I'M NOT SURE WHERE IT COMES FROM
  // THIS FUNCTION TRANSLATES THE 0..1 TO -100..0. 0=OUT, 1=IN
  const translateX = Animated.interpolate(1, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  // INSIDE THE ANIMATED VIEW YOU CAN PUT WHATEVER YOU WANT.
  // BUT THERE IS AN ISSUE WITH THE DRAWERITEMLIST THAT I DON'T UNDERSTAND
  // IF YOU TAKE IT OUT, THE APP WILL LAUNCH, ALTHOUGH IT'S STILL NOT QUITE WORKING
  // PARTLY BECAUSE THE DRAWER IS ALWAYS SET TO 100%. ALSO, I THINK THE
  // INITIALROUTE NEEDS TO BE RENDERED.
  return (
    <SafeAreaProvider>
      <DrawerContentScrollView>
        <Animated.View style={{ transform: [{ translateX }] }} {...state.routes}>
          <Text>Schedule</Text>
          <DrawerItem label="Help" onPress={() => alert('Link to help')} />
          <DrawerItemList {...state.routes} />
        </Animated.View>
      </DrawerContentScrollView>
    </SafeAreaProvider>
  );
}

// YOU HAVE TO WRAP THE NAVIGATOR IN THIS createNavigatorFactory
// TO USE IT IN APP.JS YOU DO SOMETHING LIKE THIS ...
// import createNavigatorFactory from './components/MyNavigator';
// const MyNavigator = createNavigatorFactory();
export default createNavigatorFactory(MyNavigator);

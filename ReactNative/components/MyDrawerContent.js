import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

// SEE HERE FOR MORE INFORMATION ABOUT CUSTOMIZING DRAWER CONTENT
// https://reactnavigation.org/docs/drawer-navigator#providing-a-custom-drawercontent
export function AuthenticatedDrawerContent({progress, ...rest}) {

  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView {...rest}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <DrawerItemList {...rest} />
        <DrawerItem label="Look Up Events" labelStyle={rest.labelStyle} onPress={() => alert('Not implemented') } />
        <DrawerItem label="Con Schedule" labelStyle={rest.labelStyle} onPress={() => alert('Not implemented') } />
        <DrawerItem label="My Information" labelStyle={rest.labelStyle} onPress={() => alert('Not implemented') } />
        <DrawerItem label="Conduct Policy" labelStyle={rest.labelStyle} onPress={() => alert('Not implemented') } />
        <DrawerItem label="Contact Info" labelStyle={rest.labelStyle} onPress={() => alert('Not implemented') } />
        <DrawerItem label="Report Conduct Violations" labelStyle={rest.labelStyle} onPress={() => alert('Not implemented') } />
        <DrawerItem label="Sign Out" labelStyle={rest.labelStyle} onPress={rest.logout} />
      </Animated.View>
    </DrawerContentScrollView>
  );
}

export function UnauthenticatedDrawerContent({progress, ...rest}) {

  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView {...rest}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <DrawerItemList {...rest} />
        <DrawerItem label="Look Up Events" labelStyle={rest.labelStyle} onPress={() => alert('Not implemented') } />
        <DrawerItem label="Con Schedule" labelStyle={rest.labelStyle} onPress={() => alert('Not implemented') } />
        <DrawerItem label="Conduct Policy" labelStyle={rest.labelStyle} onPress={() => alert('Not implemented') } />
        <DrawerItem label="Contact Info" labelStyle={rest.labelStyle} onPress={() => alert('Not implemented') } />
      </Animated.View>
    </DrawerContentScrollView>
  );
}

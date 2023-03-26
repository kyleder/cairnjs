import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationScreen, NavigationScreenGroup } from './types';

type ReactNavigationContainerProps = {
  screens: Array<NavigationScreen | NavigationScreenGroup>;
  isLoggedIn?: boolean;
};

const Stack = createNativeStackNavigator();

function isScreen(
  screenOrGroup: NavigationScreen | NavigationScreenGroup,
): screenOrGroup is NavigationScreen {
  return !!(screenOrGroup as NavigationScreen).component;
}

const ScreenOrGroup = ({ item }: { item: NavigationScreen | NavigationScreenGroup }) => {
  return isScreen(item) ? (
    <Stack.Screen name={item.name} component={item.component} options={item.options} />
  ) : (
    <Stack.Group screenOptions={item.options}>
      {item.screens.map((screen) => (
        <ScreenOrGroup item={screen} />
      ))}
    </Stack.Group>
  );
};

export const ReactNavigationContainer: React.FC<ReactNavigationContainerProps> = ({ screens }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Object.values(screens).map((screen: NavigationScreen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

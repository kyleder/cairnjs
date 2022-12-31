import React from 'react';
import { pickBy } from 'lodash';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { TScreen } from '@cairnjs/core';
import { useMemo } from 'react';

type NavigationScreen = {
  name: string;
  component: TScreen;
  isLoginRequired: boolean;
  options?: NativeStackNavigationOptions | (() => NativeStackNavigationOptions);
};
type NavigationScreenGroup = {
  screens: NavigationScreen[];
  isLoginRequired: boolean;
  options?: NativeStackNavigationOptions | (() => NativeStackNavigationOptions);
};

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

export const ReactNavigationContainer: React.FC<ReactNavigationContainerProps> = ({
  screens,
  isLoggedIn = false,
}) => {
  const filteredScreens = useMemo(
    () =>
      pickBy(
        screens,
        (screen: NavigationScreen | NavigationScreenGroup) => screen.isLoginRequired === isLoggedIn,
      ),
    [isLoggedIn],
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Object.values(filteredScreens).map(
          (screenOrGroup: NavigationScreen | NavigationScreenGroup) => (
            <ScreenOrGroup item={screenOrGroup} />
          ),
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

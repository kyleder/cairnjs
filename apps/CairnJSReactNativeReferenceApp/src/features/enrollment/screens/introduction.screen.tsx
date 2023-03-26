import React from 'react';
import {Screen} from '@cairnjs/module-react-navigation';
import {View, Text} from 'react-native';

export const IntroductionScreen = Screen()(function IntroductionScreen() {
  return (
    <View>
      <Text>We'll walk you through signing up</Text>
    </View>
  );
});

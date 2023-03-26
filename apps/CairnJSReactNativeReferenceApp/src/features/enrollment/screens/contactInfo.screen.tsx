import React from 'react';
import {Screen} from '@cairnjs/module-react-navigation';
import {View, Text} from 'react-native';

export const ContactInfoScreen = Screen()(function ContactInfoScreen() {
  return (
    <View>
      <Text>First Name, Last Name, etc</Text>
    </View>
  );
});

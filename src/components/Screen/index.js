import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './style';
import Moon from '../../../assets/moon.svg';

const Screen = () => {
  return (
    <View>
      <Moon width={26} height={26} fill="#fff" />
      <Text style={styles.textWrapper}>Hello</Text>
    </View>
  );
};

export default Screen;

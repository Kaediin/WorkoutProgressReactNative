import React from 'react';
import {Text} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {defaultStyles} from '../../utils/DefaultStyles';

interface AppTextProps {
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const AppText: React.FC<AppTextProps> = props => {
  return (
    <Text
      style={[defaultStyles.whiteTextColor, props.style]}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

export default AppText;

import React from 'react';
import {Insets, TouchableOpacity} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {
  TextStyle,
  ViewStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import AppText from './AppText';

interface ClickableTextProps {
  text: string | number | undefined;
  onPress: (() => void) | undefined;
  containerStyles?: StyleProp<ViewStyle>;
  styles?: StyleProp<TextStyle>;
  textAlignCenter?: boolean;
  disabled?: boolean;
  hitSlop?: Insets | number;
}

const ClickableText: React.FC<ClickableTextProps> = props => {
  return (
    <TouchableOpacity
      style={props.containerStyles}
      disabled={props.disabled}
      onPress={props.onPress}
      hitSlop={props.hitSlop}>
      <AppText
        style={[
          defaultStyles.clickableText,
          props.styles,
          props.textAlignCenter && defaultStyles.textAlignCenter,
          props.disabled && defaultStyles.disabledText,
        ]}>
        {props.text}
      </AppText>
    </TouchableOpacity>
  );
};

export default ClickableText;

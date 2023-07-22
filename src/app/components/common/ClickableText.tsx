import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface ClickableTextProps {
  text: string | number | undefined;
  onPress: (() => void) | undefined;
  styles?: StyleProp<TextStyle>;
  textAlignCenter?: boolean;
}

const ClickableText: React.FC<ClickableTextProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text
        style={[
          defaultStyles.clickableText,
          props.styles,
          props.textAlignCenter && defaultStyles.textAlignCenter,
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default ClickableText;

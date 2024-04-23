import React from 'react';
import {GestureResponderEvent, TextStyle, View} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {SegmentedButtons} from 'react-native-paper';
import type {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {defaultStyles} from '../../utils/DefaultStyles';
import Constants from '../../utils/Constants';

interface AppSegmentedButtonsProps {
  buttons: {
    value: string;
    icon?: IconSource;
    disabled?: boolean;
    accessibilityLabel?: string;
    checkedColor?: string;
    uncheckedColor?: string;
    onPress?: (event: GestureResponderEvent) => void;
    label?: string;
    showSelectedCheck?: boolean;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    testID?: string;
  }[];
  value: string;
  onValueChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const AppSegmentedButtons: React.FC<AppSegmentedButtonsProps> = props => {
  return (
    <View style={props.containerStyle}>
      <SegmentedButtons
        buttons={props.buttons.map(button => ({
          value: button.value,
          icon: button.icon,
          disabled: button.disabled,
          accessibilityLabel: button.accessibilityLabel,
          checkedColor: button.checkedColor,
          uncheckedColor: button.uncheckedColor,
          onPress: button.onPress,
          label: button.label,
          showSelectedCheck: button.showSelectedCheck,
          style: button.style || {
            borderWidth: 0,
            backgroundColor:
              props.value === button.value
                ? Constants.PRIMARY_GRADIENT[1]
                : Constants.SECONDARY_GRADIENT[0],
          },
          labelStyle: button.labelStyle || defaultStyles.whiteTextColor,
          testID: button.testID,
        }))}
        value={props.value}
        onValueChange={props.onValueChange}
      />
    </View>
  );
};

export default AppSegmentedButtons;

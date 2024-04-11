import React, {useState} from 'react';
import {
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from './AppText';
import {defaultStyles} from '../../utils/DefaultStyles';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {Dropdown} from 'react-native-element-dropdown';
import {Gender} from '../../types/Type';
import {upperCaseFirstLetter} from '../../utils/String';

interface SettingsRowProps {
  label: string;
  value: string | number | undefined;
  description?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onValueChange?: (value: string | number) => void;
  inputType?: 'gender' | 'switch' | 'number';
  number?: boolean;
}

const SettingsRowEditable: React.FC<SettingsRowProps> = props => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      style={[defaultStyles.row, defaultStyles.spaceBetween, props.style]}
      disabled={props.disabled ?? false}>
      <View>
        <AppText>{props.label}</AppText>
        {props.description && (
          <AppText T1 xSmall>
            {props.description}
          </AppText>
        )}
      </View>
      {!props.inputType ? (
        // Text input (default)
        isEditing ? (
          <View>
            <TextInput
              onBlur={() => setIsEditing(false)}
              placeholder={props.label}
              defaultValue={(props.value || '').toString()}
              style={defaultStyles.whiteTextColor}
              onChangeText={props.onValueChange}
              autoFocus
            />
          </View>
        ) : (
          <View>
            <AppText T1={props.disabled}>{props.value}</AppText>
          </View>
        )
      ) : props.inputType === 'gender' ? (
        // Gender dropdown
        <View>
          <Dropdown
            value={upperCaseFirstLetter(props.value.toString())}
            data={[
              {label: Gender.Male, value: Gender.Male},
              {label: Gender.Female, value: Gender.Female},
              {label: Gender.Other, value: Gender.Other},
            ]}
            labelField={'label'}
            valueField={'value'}
            onChange={item =>
              props.onValueChange && props.onValueChange(item.value)
            }
            style={styles.dropdownStyles}
            placeholderStyle={defaultStyles.whiteTextColor}
            selectedTextStyle={defaultStyles.whiteTextColor}
            iconColor={'white'}
            placeholder={'Gender'}
          />
        </View>
      ) : props.inputType === 'switch' ? (
        // Switch
        <Switch
          value={props.value === 'true'}
          ios_backgroundColor={'red'}
          onValueChange={value =>
            props.onValueChange && props.onValueChange(value.toString())
          }
          thumbColor={'white'}
          trackColor={{false: 'red', true: 'green'}}
        />
      ) : props.inputType === 'number' ? (
        isEditing ? (
          // Number input
          <View>
            <TextInput
              onBlur={() => setIsEditing(false)}
              placeholder={props.label}
              defaultValue={props.value ? props.value.toString() : undefined}
              style={defaultStyles.whiteTextColor}
              onChangeText={text => {
                // Check if text is a number
                if (!isNaN(parseInt(text, 10)) && props.onValueChange) {
                  const value = parseInt(text, 10);
                  if (value > 0 && value < 1000) {
                    props.onValueChange(parseInt(text, 10));
                  }
                }
              }}
              keyboardType={'numeric'}
              autoFocus
            />
          </View>
        ) : (
          <View>
            <AppText T1={props.disabled}>{props.value ?? 'Not set'}</AppText>
          </View>
        )
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdownStyles: {
    width: 90,
  },
});

export default SettingsRowEditable;

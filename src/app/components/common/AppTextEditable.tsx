import React, {useState} from 'react';
import {
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import AppText from './AppText';
import {Dropdown} from 'react-native-element-dropdown';
import {upperCaseFirstLetter} from '../../utils/String';
import {Gender} from '../../types/Type';
import {InputMaybe} from '../../graphql/operations';
import Constants from '../../utils/Constants';

interface AppTextEditableProps {
  value: InputMaybe<number> | string | number | undefined;
  placeholder: string | number;
  onValueChange: (value: string | number) => void;
  inputType?: 'gender' | 'switch' | 'number';
  disabled?: boolean;
  showAsClickable?: boolean;
}

const AppTextEditable: React.FC<AppTextEditableProps> = props => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <TouchableOpacity onPress={() => !props.disabled && setIsEditing(true)}>
      {!props.inputType ? (
        // Text input (default)
        isEditing ? (
          <View>
            <TextInput
              onBlur={() => setIsEditing(false)}
              placeholder={props.placeholder.toString()}
              defaultValue={(props.value || '').toString()}
              style={defaultStyles.whiteTextColor}
              onChangeText={props.onValueChange}
              autoFocus
              maxLength={Constants.TEXT_AREA_MAX_LENGTH}
            />
          </View>
        ) : (
          <View>
            <AppText
              T1={props.disabled}
              style={
                !props.disabled &&
                props.showAsClickable &&
                defaultStyles.clickableText
              }>
              {props.value}
            </AppText>
          </View>
        )
      ) : props.inputType === 'gender' ? (
        // Gender dropdown
        <View>
          <Dropdown
            value={upperCaseFirstLetter((props.value ?? '').toString())}
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
              placeholder={props.placeholder.toString()}
              defaultValue={props.value ? props.value.toString() : undefined}
              style={defaultStyles.whiteTextColor}
              onChangeText={text => {
                // Check if text is a number
                if (!isNaN(parseInt(text, 10)) && props.onValueChange) {
                  const value = Math.round(parseFloat(text) * 100) / 100;
                  props.onValueChange(value);
                }
              }}
              keyboardType={'numeric'}
              autoFocus
              maxLength={Constants.TEXT_AREA_MAX_LENGTH}
            />
          </View>
        ) : (
          <View>
            <AppText
              T1={props.disabled}
              style={
                !props.disabled &&
                props.showAsClickable &&
                defaultStyles.clickableText
              }>
              {props.value ?? props.placeholder}
            </AppText>
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

export default AppTextEditable;

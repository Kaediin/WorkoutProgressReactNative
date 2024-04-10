import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import AppText from './AppText';
import {defaultStyles} from '../../utils/DefaultStyles';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {Gender} from '../../types/Type';
import DropDownPicker from 'react-native-dropdown-picker';

interface SettingsRowProps {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onValueChange?: (value: string) => void;
  inputType?: 'gender';
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
      {isEditing ? (
        props.inputType === 'gender' ? (
          <View>
            <DropDownPicker
              onClose={() => setIsEditing(false)}
              closeOnBackPressed
              setValue={value =>
                props.onValueChange && props.onValueChange(value.name)
              }
              value={props.value || ''}
              placeholder={'Biological gender'}
              items={[
                {
                  label: Gender.Male,
                  value: Gender.Female,
                },
                {
                  label: Gender.Female,
                  value: Gender.Female,
                },
                {
                  label: Gender.Other,
                  value: Gender.Other,
                },
              ]}
              open={true}
              setOpen={() => setIsEditing(false)}
            />
          </View>
        ) : (
          <View>
            <TextInput
              onBlur={() => setIsEditing(false)}
              placeholder={props.label}
              defaultValue={props.value}
              style={defaultStyles.whiteTextColor}
              onChangeText={props.onValueChange}
              autoFocus
            />
          </View>
        )
      ) : (
        <View>
          <AppText T1={props.disabled}>{props.value}</AppText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SettingsRowEditable;

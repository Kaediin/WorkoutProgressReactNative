import React, {useEffect, useState} from 'react';
import {defaultStyles} from '../../utils/DefaultStyles';
import {StyleSheet, Switch, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  PreferenceInput,
  useUpdatePreferenceMutation,
  WeightUnit,
} from '../../graphql/operations';
import ClickableText from '../common/ClickableText';
import Constants from '../../utils/Constants';
import usePreferenceStore from '../../stores/preferenceStore';

interface PreferencesProps {
  onDefaultRepetitionClicked: () => void;
  onSetRepetitions: (repetitions: number) => void;
  changedRepetition: number | undefined;
}

const Preferences: React.FC<PreferencesProps> = ({
  onDefaultRepetitionClicked,
  onSetRepetitions,
  changedRepetition,
}) => {
  const preference = usePreferenceStore(state => state.preference);
  const setPreference = usePreferenceStore(state => state.setPreference);

  const [newUnitSelect, setNewUnitSelect] = useState<WeightUnit.KG>();
  const [preferenceInput, setPreferenceInput] = useState<PreferenceInput>();
  const [unitSelectOpen, setUnitSelectOpen] = useState(false);

  const [updateMyPreferences, {data: dataUpdateMyPreferences}] =
    useUpdatePreferenceMutation({
      fetchPolicy: 'no-cache',
    });

  useEffect(() => {
    if (changedRepetition) {
      setPreferenceInput(prevState => ({
        ...prevState,
        defaultRepetitions: changedRepetition,
      }));
      updateMyPreferences({
        variables: {
          input: {
            ...preferenceInput,
            defaultRepetitions: changedRepetition,
          },
        },
      });
    }
  }, [changedRepetition]);

  useEffect(() => {
    if (preference) {
      setPreferenceInput({
        unit: preference.unit,
        defaultRepetitions: preference.defaultRepetitions,
        hideUnitSelector: preference.hideUnitSelector,
      });
      onSetRepetitions(
        preference.defaultRepetitions || Constants.DEFAULT_REPETITIONS,
      );
    }
  }, [preference]);

  useEffect(() => {
    if (newUnitSelect) {
      setPreferenceInput(prevState => ({
        ...prevState,
        unit: newUnitSelect,
      }));
      updateMyPreferences({
        variables: {
          input: {
            ...preferenceInput,
            unit: newUnitSelect,
          },
        },
      });
    }
  }, [newUnitSelect]);

  useEffect(() => {
    if (dataUpdateMyPreferences?.updateMyPreference) {
      setPreference(dataUpdateMyPreferences?.updateMyPreference);
    }
  }, [dataUpdateMyPreferences?.updateMyPreference]);

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.h2}>Preferences</Text>
      <View>
        <View
          style={[
            defaultStyles.spaceBetween,
            defaultStyles.container,
            defaultStyles.zIndex10,
          ]}>
          <Text style={defaultStyles.whiteTextColor}>Unit</Text>
          <View>
            <DropDownPicker
              setValue={setNewUnitSelect}
              value={newUnitSelect || preferenceInput?.unit || WeightUnit.KG}
              items={[
                {
                  value: WeightUnit.KG,
                  label: WeightUnit.KG,
                },
                {
                  value: WeightUnit.LBS,
                  label: WeightUnit.LBS,
                },
              ]}
              open={unitSelectOpen}
              setOpen={setUnitSelectOpen}
              style={styles.dropdownContainerStyle}
              labelStyle={[
                defaultStyles.clickableText,
                defaultStyles.textAlignCenter,
              ]}
              dropDownContainerStyle={styles.dropdownContainerStyle}
              showArrowIcon={false}
            />
          </View>
        </View>
        <View style={[defaultStyles.spaceBetween, styles.padding]}>
          <View>
            <Text style={defaultStyles.whiteTextColor}>
              Default repetitions
            </Text>
          </View>
          <ClickableText
            text={
              preferenceInput?.defaultRepetitions ||
              Constants.DEFAULT_REPETITIONS
            }
            onPress={onDefaultRepetitionClicked}
            containerStyles={styles.containerDefaultRepetitionValue}
          />
        </View>
        <View
          style={[
            defaultStyles.spaceBetween,
            styles.padding,
            styles.marginTop,
          ]}>
          <View>
            <Text style={defaultStyles.whiteTextColor}>Hide unit selector</Text>
          </View>
          <Switch
            value={preferenceInput?.hideUnitSelector || false}
            onValueChange={value => {
              setPreferenceInput(prevState => ({
                ...prevState,
                hideUnitSelector: value,
              }));
              updateMyPreferences({
                variables: {
                  input: {
                    ...preferenceInput,
                    hideUnitSelector: value,
                  },
                },
              });
            }}
            ios_backgroundColor={'red'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainerStyle: {
    width: 80,
    borderWidth: 0,
  },
  input: {
    backgroundColor: 'white',
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderWidth: 0,
    width: 80,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  padding: {
    marginHorizontal: Constants.CONTAINER_PADDING_MARGIN,
  },
  containerDefaultRepetitionValue: {
    backgroundColor: 'white',
    width: 80,
    alignItems: 'center',
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  marginTop: {
    marginTop: 20,
  },
});

export default Preferences;

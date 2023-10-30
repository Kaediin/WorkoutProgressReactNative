import React, {useEffect, useState} from 'react';
import {defaultStyles} from '../../utils/DefaultStyles';
import {StyleSheet, Switch, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  LogUnit,
  PreferenceInput,
  useUpdatePreferenceMutation,
} from '../../graphql/operations';
import ClickableText from '../common/ClickableText';
import Constants from '../../utils/Constants';
import usePreferenceStore from '../../stores/preferenceStore';

interface PreferencesProps {
  onDefaultRepetitionClicked: () => void;
  onSetRepetitions: (repetitions: number) => void;
  changedRepetition: number | undefined;
  onTimerDurationClicked: () => void;
  onSetTimerDuration: (repetitions: number) => void;
  changedTimerDuration: number | undefined;
}

const Preferences: React.FC<PreferencesProps> = ({
  onDefaultRepetitionClicked,
  onSetRepetitions,
  changedRepetition,
  onTimerDurationClicked,
  onSetTimerDuration,
  changedTimerDuration,
}) => {
  const preference = usePreferenceStore(state => state.preference);
  const setPreference = usePreferenceStore(state => state.setPreference);

  const [distanceUnitSelect, setDistanceUnitSelect] = useState<LogUnit.KM>();
  const [weightUnitSelect, setWeightUnitSelect] = useState<LogUnit.KG>();
  const [preferenceInput, setPreferenceInput] = useState<PreferenceInput>();
  const [distanceUnitSelectOpen, setDistanceUnitSelectOpen] = useState(false);
  const [weightSelectOpen, setWeightSelectOpen] = useState(false);

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
    if (changedTimerDuration && changedTimerDuration >= 10) {
      setPreferenceInput(prevState => ({
        ...prevState,
        timerDuration: changedTimerDuration,
      }));
      updateMyPreferences({
        variables: {
          input: {
            ...preferenceInput,
            timerDuration: changedTimerDuration,
          },
        },
      });
    }
  }, [changedTimerDuration]);

  useEffect(() => {
    if (preference) {
      setPreferenceInput({
        distanceUnit: preference.distanceUnit,
        weightUnit: preference.weightUnit,
        defaultRepetitions: preference.defaultRepetitions,
        hideUnitSelector: preference.hideUnitSelector,
        autoAdjustWorkoutMuscleGroups: preference.autoAdjustWorkoutMuscleGroups,
        timerDuration: preference.timerDuration,
        autoStartTimer: preference.autoStartTimer,
      });
      onSetRepetitions(
        preference.defaultRepetitions || Constants.DEFAULT_REPETITIONS,
      );
      onSetTimerDuration(
        preference.timerDuration || Constants.DEFAULT_DURATION,
      );
    }
  }, [preference]);

  useEffect(() => {
    if (weightUnitSelect) {
      setPreferenceInput(prevState => ({
        ...prevState,
        weightUnit: weightUnitSelect,
      }));
      updateMyPreferences({
        variables: {
          input: {
            ...preferenceInput,
            weightUnit: weightUnitSelect,
          },
        },
      });
    }
  }, [weightUnitSelect]);

  useEffect(() => {
    if (distanceUnitSelect) {
      setPreferenceInput(prevState => ({
        ...prevState,
        distanceUnit: distanceUnitSelect,
      }));
      updateMyPreferences({
        variables: {
          input: {
            ...preferenceInput,
            distanceUnit: distanceUnitSelect,
          },
        },
      });
    }
  }, [distanceUnitSelect]);

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
          <View style={styles.labelContainer}>
            <Text style={defaultStyles.whiteTextColor}>Unit</Text>
            <Text style={defaultStyles.footnote}>
              Preferred unit (weight, distance)
            </Text>
          </View>
          <View style={styles.controlContainer}>
            <View style={defaultStyles.row}>
              <DropDownPicker
                setValue={setWeightUnitSelect}
                value={
                  weightUnitSelect || preferenceInput?.weightUnit || LogUnit.KG
                }
                items={[
                  {
                    value: LogUnit.KG,
                    label: LogUnit.KG,
                  },
                  {
                    value: LogUnit.LBS,
                    label: LogUnit.LBS,
                  },
                ]}
                open={weightSelectOpen}
                setOpen={setWeightSelectOpen}
                style={styles.dropdownStyle}
                labelStyle={[
                  defaultStyles.clickableText,
                  defaultStyles.textAlignRight,
                ]}
                dropDownContainerStyle={styles.dropdownContainerStyle}
                showArrowIcon={false}
              />
              <DropDownPicker
                setValue={setDistanceUnitSelect}
                value={
                  distanceUnitSelect ||
                  preferenceInput?.distanceUnit ||
                  LogUnit.KM
                }
                items={[
                  {
                    value: LogUnit.KM,
                    label: LogUnit.KM,
                  },
                  {
                    value: LogUnit.MI,
                    label: LogUnit.MI,
                  },
                ]}
                open={distanceUnitSelectOpen}
                setOpen={setDistanceUnitSelectOpen}
                style={styles.dropdownStyle}
                labelStyle={[
                  defaultStyles.clickableText,
                  defaultStyles.textAlignRight,
                ]}
                dropDownContainerStyle={styles.dropdownContainerStyle}
                showArrowIcon={false}
              />
            </View>
          </View>
        </View>
        <View style={[defaultStyles.spaceBetween, styles.padding]}>
          <View style={styles.labelContainer}>
            <Text style={defaultStyles.whiteTextColor}>
              Default repetitions
            </Text>
            <Text style={defaultStyles.footnote}>
              Automatically preset the value for repetitions
            </Text>
          </View>
          <View style={styles.controlContainer}>
            <ClickableText
              text={
                preferenceInput?.defaultRepetitions ||
                Constants.DEFAULT_REPETITIONS
              }
              onPress={onDefaultRepetitionClicked}
              containerStyles={styles.containerDefaultRepetitionValue}
            />
          </View>
        </View>
        <View
          style={[
            defaultStyles.spaceBetween,
            styles.padding,
            styles.marginTop,
          ]}>
          <View style={styles.labelContainer}>
            <Text style={defaultStyles.whiteTextColor}>Hide unit selector</Text>
            <Text style={defaultStyles.footnote}>
              Hide the unit selector when logging any value.
            </Text>
          </View>
          <View style={styles.controlContainer}>
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
        <View
          style={[
            defaultStyles.spaceBetween,
            styles.padding,
            styles.marginTop,
          ]}>
          <View style={styles.labelContainer}>
            <Text style={defaultStyles.whiteTextColor}>
              Auto adjust workout muscle groups
            </Text>
            <Text style={defaultStyles.footnote}>
              Automatically determine the muscle groups based on the logged
              exercises
            </Text>
          </View>
          <View style={styles.controlContainer}>
            <Switch
              value={preferenceInput?.autoAdjustWorkoutMuscleGroups ?? false}
              onValueChange={value => {
                setPreferenceInput(prevState => ({
                  ...prevState,
                  autoAdjustWorkoutMuscleGroups: value,
                }));
                updateMyPreferences({
                  variables: {
                    input: {
                      ...preferenceInput,
                      autoAdjustWorkoutMuscleGroups: value,
                    },
                  },
                });
              }}
              ios_backgroundColor={'red'}
            />
          </View>
        </View>
        <View
          style={[
            defaultStyles.spaceBetween,
            styles.padding,
            styles.marginTop,
          ]}>
          <View style={styles.labelContainer}>
            <Text style={defaultStyles.whiteTextColor}>
              Default timer duration
            </Text>
            <Text style={defaultStyles.footnote}>
              Automatically start the timer from the set duration
            </Text>
          </View>
          <View style={styles.controlContainer}>
            <ClickableText
              text={
                preferenceInput?.timerDuration || Constants.DEFAULT_DURATION
              }
              onPress={onTimerDurationClicked}
              containerStyles={styles.containerDefaultRepetitionValue}
            />
          </View>
        </View>
        <View
          style={[
            defaultStyles.spaceBetween,
            styles.padding,
            styles.marginTop,
          ]}>
          <View style={styles.labelContainer}>
            <Text style={defaultStyles.whiteTextColor}>
              Auto start timer after logging exercise
            </Text>
            <Text style={defaultStyles.footnote}>
              Automatically start the timer with the duration set in preference,
              after logging an exercise for a workout. Note: this only applies
              for you active workout.
            </Text>
          </View>
          <View style={styles.controlContainer}>
            <Switch
              value={preferenceInput?.autoStartTimer ?? false}
              onValueChange={value => {
                setPreferenceInput(prevState => ({
                  ...prevState,
                  autoStartTimer: value,
                }));
                updateMyPreferences({
                  variables: {
                    input: {
                      ...preferenceInput,
                      autoStartTimer: value,
                    },
                  },
                });
              }}
              ios_backgroundColor={'red'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flex: 3,
    alignItems: 'flex-start',
    marginRight: Constants.CONTAINER_PADDING_MARGIN,
  },
  controlContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dropdownStyle: {
    width: 80,
    borderWidth: 0,
    backgroundColor: '0000000',
  },
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
    width: 80,
    alignItems: 'flex-end',
    padding: Constants.CONTAINER_PADDING_MARGIN,
  },
  marginTop: {
    marginTop: 20,
  },
});

export default Preferences;

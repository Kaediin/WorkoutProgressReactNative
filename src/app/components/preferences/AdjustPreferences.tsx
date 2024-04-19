import React, {useEffect, useState} from 'react';
import usePreferenceStore from '../../stores/preferenceStore';
import {
  LogUnit,
  PreferenceInput,
  useUpdatePreferenceMutation,
} from '../../graphql/operations';
import {Platform, ScrollView, StyleSheet, Switch, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import AppText from '../common/AppText';
import ClickableText from '../common/ClickableText';
import Constants from '../../utils/Constants';
import SinglePicker from '../bottomSheet/SinglePicker';
import {Dropdown} from 'react-native-element-dropdown';

interface AdjustPreferencesProps {
  onPickerActive?: (active: boolean) => void;
}

const AdjustPreferences: React.FC<AdjustPreferencesProps> = props => {
  const preference = usePreferenceStore(state => state.preference);
  const setPreference = usePreferenceStore(state => state.setPreference);

  const [pickerActiveDuration, setPickerActiveDuration] = useState(false);
  const [pickerActiveReps, setPickerActiveReps] = useState(false);
  const [preferenceInput, setPreferenceInput] = useState<PreferenceInput>();

  const [updateMyPreferences] = useUpdatePreferenceMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.updateMyPreference) {
        setPreference(data.updateMyPreference);
      }
    },
  });

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
        playTimerCompletionSound: preference.playTimerCompletionSound,
      });
    }
  }, [preference]);

  useEffect(() => {
    props.onPickerActive &&
      props.onPickerActive(pickerActiveDuration || pickerActiveReps);
  }, [pickerActiveDuration, pickerActiveReps, props.onPickerActive]);

  return (
    <>
      <ScrollView style={defaultStyles.container}>
        <View style={defaultStyles.container}>
          <AppText h4>Value logging</AppText>
          <View style={defaultStyles.separator} />
          <View
            style={[
              defaultStyles.spaceBetween,
              defaultStyles.container,
              defaultStyles.zIndex10,
            ]}>
            <View style={styles.labelContainer}>
              <AppText>Unit</AppText>
              <AppText style={defaultStyles.footnote}>
                Preferred unit (weight, distance)
              </AppText>
            </View>
            <View style={styles.controlContainer}>
              <View style={defaultStyles.row}>
                <Dropdown
                  data={[
                    {
                      value: LogUnit.KG,
                      label: LogUnit.KG,
                    },
                    {
                      value: LogUnit.LBS,
                      label: LogUnit.LBS,
                    },
                  ]}
                  labelField={'label'}
                  valueField={'value'}
                  value={preferenceInput?.weightUnit || LogUnit.KG}
                  style={styles.dropdownStyle}
                  placeholderStyle={defaultStyles.clickableText}
                  iconColor={'white'}
                  selectedTextStyle={defaultStyles.clickableText}
                  onChange={item => {
                    setPreferenceInput(prevState => ({
                      ...prevState,
                      weightUnit: item.value as LogUnit,
                    }));
                    updateMyPreferences({
                      variables: {
                        input: {
                          ...preferenceInput,
                          weightUnit: item.value as LogUnit,
                        },
                      },
                    });
                  }}
                />
                <View style={defaultStyles.marginHorizontal} />
                <Dropdown
                  data={[
                    {
                      value: LogUnit.KM,
                      label: LogUnit.KM,
                    },
                    {
                      value: LogUnit.MI,
                      label: LogUnit.MI,
                    },
                  ]}
                  labelField={'label'}
                  valueField={'value'}
                  value={preferenceInput?.distanceUnit || LogUnit.KM}
                  style={styles.dropdownStyle}
                  placeholderStyle={defaultStyles.clickableText}
                  iconColor={'white'}
                  selectedTextStyle={defaultStyles.clickableText}
                  onChange={item => {
                    setPreferenceInput(prevState => ({
                      ...prevState,
                      distanceUnit: item.value as LogUnit,
                    }));
                    updateMyPreferences({
                      variables: {
                        input: {
                          ...preferenceInput,
                          distanceUnit: item.value as LogUnit,
                        },
                      },
                    });
                  }}
                />
              </View>
            </View>
          </View>
          <View style={[defaultStyles.spaceBetween, styles.padding]}>
            <View style={styles.labelContainer}>
              <AppText>Default repetitions</AppText>
              <AppText style={defaultStyles.footnote}>
                Automatically preset the value for repetitions
              </AppText>
            </View>
            <View style={styles.controlContainer}>
              <ClickableText
                text={
                  preferenceInput?.defaultRepetitions ||
                  Constants.DEFAULT_REPETITIONS
                }
                onPress={() => setPickerActiveReps(true)}
                containerStyles={styles.containerDefaultRepetitionValue}
              />
            </View>
          </View>
          <View
            style={[
              defaultStyles.spaceBetween,
              styles.padding,
              styles.marginTop,
              defaultStyles.marginBottom,
            ]}>
            <View style={styles.labelContainer}>
              <AppText>Hide unit selector</AppText>
              <AppText style={defaultStyles.footnote}>
                Hide the unit selector when logging any value.
              </AppText>
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
          <AppText h4>Timer</AppText>
          <View style={defaultStyles.separator} />
          <View style={[defaultStyles.spaceBetween, styles.padding]}>
            <View style={styles.labelContainer}>
              <AppText>Default timer duration</AppText>
              <AppText style={defaultStyles.footnote}>
                Automatically start the timer from the set duration
              </AppText>
            </View>
            <View style={styles.controlContainer}>
              <ClickableText
                text={
                  (preferenceInput?.timerDuration ||
                    Constants.DEFAULT_DURATION) + ' sec'
                }
                onPress={() => setPickerActiveDuration(true)}
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
              <AppText>Auto start timer after logging exercise</AppText>
              <AppText style={defaultStyles.footnote}>
                Automatically start the timer with the duration set in
                preference, after logging an exercise for a workout. Note: this
                only applies for you active workout.
              </AppText>
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
          {Platform.OS === 'ios' && (
            <View
              style={[
                defaultStyles.spaceBetween,
                styles.padding,
                styles.marginTop,
              ]}>
              <View style={styles.labelContainer}>
                <AppText>Play sound after timer completes</AppText>
                <AppText style={defaultStyles.footnote}>
                  Automatically play a sound through media that marks the
                  completion of the timer which is active in the background
                </AppText>
              </View>
              <View style={styles.controlContainer}>
                <Switch
                  value={preferenceInput?.playTimerCompletionSound ?? true}
                  onValueChange={value => {
                    setPreferenceInput(prevState => ({
                      ...prevState,
                      playTimerCompletionSound: value,
                    }));
                    updateMyPreferences({
                      variables: {
                        input: {
                          ...preferenceInput,
                          playTimerCompletionSound: value,
                        },
                      },
                    });
                  }}
                  ios_backgroundColor={'red'}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <SinglePicker
        active={pickerActiveDuration}
        onDismiss={() => setPickerActiveDuration(false)}
        pickerValue={
          +(preferenceInput?.timerDuration || Constants.DEFAULT_DURATION)
        }
        onPickerSelect={value => {
          setPreferenceInput(prevState => ({
            ...prevState,
            timerDuration: +value,
          }));
          updateMyPreferences({
            variables: {
              input: {
                ...preferenceInput,
                timerDuration: +value,
              },
            },
          });
        }}
        pickerOptions={Constants.DURATION_SECONDS}
        hideRightText
      />
      <SinglePicker
        active={pickerActiveReps}
        onDismiss={() => setPickerActiveReps(false)}
        pickerValue={
          preferenceInput?.defaultRepetitions || Constants.DEFAULT_REPETITIONS
        }
        onPickerSelect={value => {
          setPreferenceInput(prevState => ({
            ...prevState,
            defaultRepetitions: +value,
          }));
          updateMyPreferences({
            variables: {
              input: {
                ...preferenceInput,
                defaultRepetitions: +value,
              },
            },
          });
        }}
        pickerOptions={Constants.BOTTOM_SHEET_SNAPPOINTS.map(
          value => +value.replace('%', ''),
        )}
        hideRightText
      />
    </>
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
    width: 60,
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
  marginTopLarge: {
    marginTop: 100,
  },
});

export default AdjustPreferences;

import React, {useEffect, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import usePreferenceStore from '../../stores/preferenceStore';
import {
  LogUnit,
  PreferenceInput,
  useUpdatePreferenceMutation,
} from '../../graphql/operations';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import AppText from '../common/AppText';
import DropDownPicker from 'react-native-dropdown-picker';
import ClickableText from '../common/ClickableText';
import Constants from '../../utils/Constants';
import HeaderLabel from '../nav/headerComponents/HeaderLabel';
import {Delete} from '../../icons/svg';
import SinglePicker from '../bottomSheet/SinglePicker';
import ConfirmModal from '../common/ConfirmModal';

interface AdjustPreferencesProps {
  hidePermaDelete?: boolean;
}

const AdjustPreferences: React.FC<AdjustPreferencesProps> = props => {
  const {deleteUser} = useAuth();
  const preference = usePreferenceStore(state => state.preference);
  const setPreference = usePreferenceStore(state => state.setPreference);

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [pickerActiveDuration, setPickerActiveDuration] = useState(false);
  const [pickerActiveReps, setPickerActiveReps] = useState(false);
  const [weightUnitSelect, setWeightUnitSelect] = useState<LogUnit.KG>();
  const [distanceUnitSelect, setDistanceUnitSelect] = useState<LogUnit.KM>();
  const [preferenceInput, setPreferenceInput] = useState<PreferenceInput>();
  const [distanceUnitSelectOpen, setDistanceUnitSelectOpen] = useState(false);
  const [weightSelectOpen, setWeightSelectOpen] = useState(false);

  const [updateMyPreferences, {data: dataUpdateMyPreferences}] =
    useUpdatePreferenceMutation({
      fetchPolicy: 'no-cache',
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
    <>
      <ScrollView style={defaultStyles.container}>
        <View style={defaultStyles.container}>
          <AppText style={[defaultStyles.h4]}>Value logging</AppText>

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
                <DropDownPicker
                  setValue={setWeightUnitSelect}
                  value={
                    weightUnitSelect ||
                    preferenceInput?.weightUnit ||
                    LogUnit.KG
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
          <AppText style={defaultStyles.h4}>Timer</AppText>
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
                  preferenceInput?.timerDuration || Constants.DEFAULT_DURATION
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

          {!props.hidePermaDelete && (
            <TouchableOpacity
              style={styles.deleteRow}
              onPress={() => setShowDeleteAccountModal(true)}>
              <HeaderLabel
                label={'Permanently delete account'}
                onPress={() => setShowDeleteAccountModal(true)}
                color={Constants.ERROR_GRADIENT[1]}
              />
              <Delete />
            </TouchableOpacity>
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

      <ConfirmModal
        message={
          'Are you sure you want to permanently delete your account? This action cannot be reversed and your account along with its data will be erased forever'
        }
        isOpen={showDeleteAccountModal}
        type={'WARNING'}
        onDismiss={() => setShowDeleteAccountModal(false)}
        onConfirm={() => {
          const response = deleteUser();
          console.log(response);
        }}
        overrideConfirmGradient={Constants.ERROR_GRADIENT}
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
  marginTopLarge: {
    marginTop: 100,
  },
  deleteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 200,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderColor: Constants.ERROR_GRADIENT[1],
    borderWidth: 1,
    marginLeft: 10,
  },
});

export default AdjustPreferences;

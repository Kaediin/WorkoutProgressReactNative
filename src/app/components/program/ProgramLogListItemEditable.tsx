import React, {useEffect, useMemo, useState} from 'react';
import {defaultStyles} from '../../utils/DefaultStyles';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../common/AppText';
import AppTextEditable from '../common/AppTextEditable';
import {Dropdown} from 'react-native-element-dropdown';
import {
  ExerciseFragment,
  LogUnit,
  ProgramLogInput,
} from '../../graphql/operations';
import Constants from '../../utils/Constants';
import ClickableText from '../common/ClickableText';
import ExpandableView from '../common/ExpandableView';
import SelectExercises from '../workouts/SelectExercises';
import {ProgramLogAdvancedSettings} from '../../route/program/ProgramCreateLogScreen';

interface ProgramLogListItemEditableProps {
  exerciseLog: ProgramLogInput;
  onExerciseLogChange: (exerciseLog: ProgramLogInput) => void;
  advancedSettings: ProgramLogAdvancedSettings;
  exercises?: ExerciseFragment[];
  showLabels?: boolean;
}

const ProgramLogListItemEditable: React.FC<
  ProgramLogListItemEditableProps
> = props => {
  // State
  const [showPickerExercise, setShowPickerExercise] = useState(false);
  const [exerciseLog, setExerciseLog] = useState<ProgramLogInput>(
    props.exerciseLog,
  );

  const showCooldownOrIntervalTimer = useMemo(() => {
    return (
      (!props.advancedSettings.separateTimePerSubdivision &&
        !props.advancedSettings.enableSubdivisions) ||
      (props.advancedSettings.enableSubdivisions &&
        props.advancedSettings.separateTimePerSubdivision)
    );
  }, [props.advancedSettings]);

  // Update state with new exerciseLog
  useEffect(() => {
    setExerciseLog(props.exerciseLog);
  }, [props.exerciseLog]);

  // When exerciseLog changes, update parent state
  useEffect(() => {
    if (exerciseLog === props.exerciseLog) {
      return;
    }
    props.onExerciseLogChange(exerciseLog);
  }, [exerciseLog]);

  return (
    <View>
      {props.showLabels && (
        <View
          style={[
            defaultStyles.row,
            props.advancedSettings.enableSubdivisions && styles.isSubdivision,
          ]}>
          {!props.advancedSettings.enableSubdivisions && (
            <>
              <View style={styles.containerRepetitions}>
                <AppText xSmall T2>
                  Reps
                </AppText>
              </View>
              <View style={styles.containerX} />
            </>
          )}
          <View style={styles.containerBaseValue}>
            <AppText xSmall T2>
              Value
            </AppText>
          </View>
          {!props.advancedSettings.enableSubdivisions ? (
            <>
              <View style={styles.containerUnit}>
                <AppText xSmall T2>
                  Unit
                </AppText>
              </View>
              {props.exercises && props.exercises.length > 0 && (
                <View style={styles.containerExercise}>
                  <AppText xSmall T2>
                    Exercise
                  </AppText>
                </View>
              )}
            </>
          ) : (
            <>
              <View style={styles.containerUnitDisabled} />
              <View style={styles.containerExercise}>
                <AppText xSmall T2>
                  Exercise
                </AppText>
              </View>
            </>
          )}

          {showCooldownOrIntervalTimer &&
            (props.advancedSettings.timerState === 'cooldown' ? (
              <View style={styles.containerTimerSeconds}>
                <AppText xSmall T2>
                  Cooldown
                </AppText>
              </View>
            ) : props.advancedSettings.timerState === 'interval' ? (
              <View style={styles.containerTimerSeconds}>
                <AppText xSmall T2>
                  Interval
                </AppText>
              </View>
            ) : (
              <></>
            ))}
        </View>
      )}
      <View
        style={[
          defaultStyles.row,
          props.advancedSettings.enableSubdivisions && styles.isSubdivision,
        ]}>
        {!props.advancedSettings.enableSubdivisions && (
          <>
            <View style={styles.containerRepetitions}>
              <AppTextEditable
                value={exerciseLog.repetitions}
                placeholder={'value'}
                onValueChange={value => {
                  setExerciseLog(prevState => ({
                    ...prevState,
                    repetitions: value as number,
                  }));
                }}
                inputType={'number'}
                showAsClickable
              />
            </View>
            <AppText style={styles.containerX}>x</AppText>
          </>
        )}
        <View style={styles.containerBaseValue}>
          <AppTextEditable
            value={exerciseLog.logValue.base}
            placeholder={'value'}
            onValueChange={value => {
              // TODO: Validation on . and , and round to nearest .25
              setExerciseLog(prevState => ({
                ...prevState,
                logValue: {
                  ...prevState.logValue,
                  base: value as number,
                },
              }));
            }}
            inputType={'number'}
            showAsClickable
          />
        </View>
        {props.advancedSettings.enableSubdivisions ? (
          <View style={styles.containerUnitDisabled}>
            <AppText T1>{exerciseLog.logValue?.unit ?? 'Unit'}</AppText>
          </View>
        ) : (
          <View style={styles.containerUnit}>
            <Dropdown
              //TODO: Redo units
              data={Object.keys(LogUnit).map(unit => ({
                label: unit,
                value: unit as LogUnit,
              }))}
              placeholder={'Unit'}
              labelField={'label'}
              valueField={'value'}
              value={exerciseLog.logValue.unit ?? undefined}
              placeholderStyle={defaultStyles.clickableText}
              iconColor={'white'}
              selectedTextStyle={[
                defaultStyles.clickableText,
                styles.dropdownFontSize,
              ]}
              style={styles.containerUnitSelector}
              itemTextStyle={styles.dropdownFontSize}
              onChange={item => {
                if (item.value === undefined) {
                  return;
                }
                setExerciseLog(prevState => ({
                  ...prevState,
                  logValue: {
                    ...prevState.logValue,
                    unit: item.value as LogUnit,
                  },
                }));
              }}
            />
          </View>
        )}

        {props.exercises && props.exercises.length > 0 && (
          <View style={styles.containerExercise}>
            <TouchableOpacity
              style={defaultStyles.marginVertical}
              onPress={() => setShowPickerExercise(!showPickerExercise)}>
              <ClickableText
                text={
                  props.exercises.find(x => x.id === exerciseLog.exerciseId)
                    ?.name ?? 'Pick exercise'
                }
                onPress={() => setShowPickerExercise(!showPickerExercise)}
              />
            </TouchableOpacity>
          </View>
        )}

        {showCooldownOrIntervalTimer &&
          (props.advancedSettings.timerState === 'cooldown' ? (
            <View style={[styles.containerTimerSeconds, defaultStyles.row]}>
              <AppTextEditable
                value={exerciseLog.cooldownSeconds}
                placeholder={'Seconds'}
                onValueChange={value =>
                  setExerciseLog(prevState => ({
                    ...prevState,
                    intervalSeconds: undefined,
                    cooldownSeconds: value as number,
                  }))
                }
                inputType="number"
                showAsClickable
              />
            </View>
          ) : props.advancedSettings.timerState === 'interval' ? (
            <View style={[styles.containerTimerSeconds, defaultStyles.row]}>
              <AppTextEditable
                value={exerciseLog.intervalSeconds}
                placeholder={'Seconds'}
                onValueChange={value =>
                  setExerciseLog(prevState => ({
                    ...prevState,
                    cooldownSeconds: undefined,
                    intervalSeconds: value as number,
                  }))
                }
                inputType="number"
                showAsClickable
              />
            </View>
          ) : (
            <></>
          ))}
      </View>
      <ExpandableView showChildren={showPickerExercise} contentHeight={275}>
        <View style={[styles.border, defaultStyles.marginBottom]}>
          <SelectExercises
            onSelect={exercise =>
              setExerciseLog({
                ...exerciseLog,
                exerciseId: exercise.id,
              })
            }
            exercises={props.exercises ?? []}
            selectedId={exerciseLog?.exerciseId ?? ''}
            pickerItemColor={'white'}
            selectionColor={'#ffffff33'}
          />
        </View>
      </ExpandableView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRepetitions: {
    width: 30,
  },
  containerBaseValue: {
    width: 35,
  },
  containerX: {
    width: 15,
  },
  containerUnit: {
    width: 65,
    marginLeft: 10,
  },
  containerUnitSelector: {
    paddingRight: 10,
  },
  dropdownFontSize: {
    fontSize: 14,
  },
  containerTimerSeconds: {
    width: 60,
  },
  containerExercise: {
    width: 100,
    marginLeft: Constants.CONTAINER_PADDING_MARGIN,
  },
  isSubdivision: {
    alignSelf: 'flex-end',
  },
  border: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  containerUnitDisabled: {
    width: 30,
  },
});

export default ProgramLogListItemEditable;

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
import AppSlider from '../common/AppSlider';
import {logValueToString} from '../../utils/String';

interface ProgramLogListItemEditableProps {
  programLogInput: ProgramLogInput;
  onExerciseLogChange: (exerciseLog: ProgramLogInput) => void;
  advancedSettings: ProgramLogAdvancedSettings;
  exercises?: ExerciseFragment[];
  showLabels?: boolean;
}

const ProgramLogListItemEditable: React.FC<
  ProgramLogListItemEditableProps
> = props => {
  // State
  const [showEffort, setShowEffort] = useState(false);
  const [showPickerExercise, setShowPickerExercise] = useState(false);
  const [exerciseLog, setExerciseLog] = useState<ProgramLogInput>(
    props.programLogInput,
  );

  const showCooldownOrIntervalTimer = useMemo(() => {
    return (
      (!props.advancedSettings.separateTimePerSubdivision &&
        !props.advancedSettings.enableSubdivisions) ||
      (props.advancedSettings.enableSubdivisions &&
        props.advancedSettings.separateTimePerSubdivision)
    );
  }, [props.advancedSettings]);

  const disableRepsAndValue = useMemo(() => {
    if (
      !props.advancedSettings.enableSubdivisions &&
      (!props.exercises || props.exercises.length === 0)
    ) {
      return true;
    }
  }, [props.advancedSettings]);

  // Update state with new exerciseLog
  useEffect(() => {
    setExerciseLog(props.programLogInput);
  }, [props.programLogInput]);

  // When exerciseLog changes, update parent state
  useEffect(() => {
    if (exerciseLog === props.programLogInput) {
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
          <View style={styles.containerRepetitions}>
            <AppText xSmall T2>
              Reps
            </AppText>
          </View>
          <View style={styles.containerX} />
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
                <>
                  <View style={styles.containerExercise}>
                    <AppText xSmall T2>
                      Exercise
                    </AppText>
                  </View>
                  <View style={styles.containerEffort}>
                    <AppText xSmall T2>
                      Effort
                    </AppText>
                  </View>
                </>
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
              <View style={styles.containerEffort}>
                <AppText xSmall T2>
                  Effort
                </AppText>
              </View>
            </>
          )}

          {showCooldownOrIntervalTimer &&
            (props.advancedSettings.timerState === 'cooldown' ? (
              <View style={styles.containerTimerSeconds}>
                <AppText xSmall T2>
                  Rest
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
            disabled={disableRepsAndValue}
          />
        </View>
        <AppText style={styles.containerX}>x</AppText>
        <View style={styles.containerBaseValue}>
          <AppTextEditable
            value={
              (parseFloat(logValueToString(exerciseLog.logValue)) * 100) / 100
            }
            placeholder={'value'}
            onValueChange={value => {
              const fraction = isNaN(value as number)
                ? undefined
                : parseInt(value.toString().split('.')[1], 10);

              setExerciseLog(prevState => ({
                ...prevState,
                logValue: {
                  ...prevState.logValue,
                  base: parseInt(value.toString().split('.')[0], 10),
                  fraction,
                },
              }));
            }}
            inputType={'number'}
            showAsClickable
            disabled={disableRepsAndValue}
          />
        </View>
        {props.advancedSettings.enableSubdivisions ? (
          <View style={styles.containerUnitDisabled}>
            <AppText T1>
              {exerciseLog.logValue?.unit?.toLowerCase() ?? 'Unit'}
            </AppText>
          </View>
        ) : (
          <View style={styles.containerUnit}>
            <Dropdown
              data={Object.keys(LogUnit).map(unit => ({
                label: unit.toLowerCase(),
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
          <>
            <View style={styles.containerExercise}>
              <TouchableOpacity
                style={defaultStyles.marginVertical}
                onPress={() => {
                  setShowEffort(false);
                  setShowPickerExercise(!showPickerExercise);
                }}>
                <ClickableText
                  text={
                    props.exercises.find(x => x.id === exerciseLog.exerciseId)
                      ?.name ?? 'Pick'
                  }
                  onPress={() => {
                    setShowEffort(false);
                    setShowPickerExercise(!showPickerExercise);
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerEffort}>
              <TouchableOpacity
                style={defaultStyles.marginVertical}
                onPress={() => {
                  setShowPickerExercise(false);
                  setShowEffort(!showEffort);
                }}>
                <ClickableText
                  text={props.programLogInput.effort || 'Set'}
                  onPress={() => {
                    setShowPickerExercise(false);
                    setShowEffort(!showEffort);
                  }}
                />
              </TouchableOpacity>
            </View>
          </>
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
      <ExpandableView showChildren={showEffort} contentHeight={200}>
        <View style={defaultStyles.marginTop}>
          <AppText xSmall>Effort</AppText>
          <AppText xSmall T2>
            Indicate what the max % of effort should be used for this log. Lower
            = easier, set on 0 to disable
          </AppText>
          <AppText centerText T1 style={styles.effortLabel}>
            {exerciseLog.effort ?? 0}%
          </AppText>
          <AppSlider
            value={exerciseLog.effort ?? 0}
            onChange={value =>
              setExerciseLog(prevState => ({
                ...prevState,
                effort: value,
              }))
            }
            step={5}
            disabled={false}
          />
          <View style={defaultStyles.marginTop} />
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
    minWidth: 40,
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
    width: 75,
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
  effortLabel: {
    marginVertical: 10,
  },
  containerEffort: {
    width: 40,
  },
});

export default ProgramLogListItemEditable;

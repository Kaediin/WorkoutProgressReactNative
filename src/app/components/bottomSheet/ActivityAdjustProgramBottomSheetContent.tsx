import React, {useMemo} from 'react';
import {ProgramLogInput} from '../../graphql/operations';
import {StyleSheet, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import AppText from '../common/AppText';
import AppTextEditable from '../common/AppTextEditable';
import {ProgramLogAdvancedSettings} from '../../route/program/ProgramCreateLogScreen';
import {enumToReadableString, logValueToString} from '../../utils/String';
import AppSlider from '../common/AppSlider';
import {ArrowDownRight} from '../../icons/svg';
import Constants from '../../utils/Constants';

interface ActivityAdjustProgramBottomSheetContentProps {
  id: string;
  log: ProgramLogInput;
  onLogChange: (log: ProgramLogInput) => void;
  exerciseMap: Record<string, string>;
}

const ActivityAdjustProgramBottomSheetContent: React.FC<
  ActivityAdjustProgramBottomSheetContentProps
> = props => {
  const mainTimerLabel = useMemo<
    ProgramLogAdvancedSettings['timerState']
  >(() => {
    if (!!props.log.cooldownSeconds && props.log.cooldownSeconds > 0) {
      return 'cooldown';
    } else if (!!props.log.intervalSeconds && props.log.intervalSeconds > 0) {
      return 'interval';
    }
    return 'disabled';
  }, [props.log]);

  const hasSubdivisions =
    props.log.subdivisions && props.log.subdivisions.length > 0;

  return (
    <View>
      <View style={defaultStyles.row}>
        <View style={styles.repContainer}>
          <AppText T2 xSmall>
            Rep
          </AppText>
          <AppTextEditable
            value={props.log.repetitions}
            placeholder={''}
            onValueChange={value =>
              props.onLogChange({
                ...props.log,
                repetitions: value as number,
              })
            }
            inputType={'number'}
            disabled={!!props.log.subdivisions}
            showAsClickable
          />
        </View>
        <AppText xSmall style={styles.xContainer}>
          x
        </AppText>
        <View style={styles.valueContainer}>
          <AppText T2 xSmall>
            Weight
          </AppText>
          <AppTextEditable
            value={
              (parseFloat(logValueToString(props.log.logValue)) * 100) / 100
            }
            placeholder={''}
            onValueChange={value => {
              const fraction = isNaN(value as number)
                ? undefined
                : parseInt(value.toString().split('.')[1], 10);

              props.onLogChange({
                ...props.log,
                logValue: {
                  ...props.log.logValue,
                  base: parseInt(value.toString().split('.')[0], 10),
                  fraction,
                },
              });
            }}
            inputType={'number'}
            disabled={!!props.log.subdivisions}
            showAsClickable
          />
        </View>
        <View style={styles.unitContainer}>
          <AppText T2 xSmall>
            Unit
          </AppText>
          <AppTextEditable
            value={props.log.logValue.unit}
            placeholder={''}
            onValueChange={() => {}}
            disabled
          />
        </View>
        {!hasSubdivisions && (
          <View style={styles.exerciseContainer}>
            <AppText T2 xSmall>
              Exercise
            </AppText>
            <AppTextEditable
              value={props.exerciseMap[props.log?.exerciseId ?? ''] ?? ''}
              placeholder={''}
              onValueChange={() => {}}
              disabled
            />
          </View>
        )}
        {mainTimerLabel !== 'disabled' && (
          <View style={styles.timerContainer}>
            <AppText T2 xSmall>
              {enumToReadableString(mainTimerLabel)}
            </AppText>
            <AppTextEditable
              value={
                mainTimerLabel === 'cooldown'
                  ? props.log.cooldownSeconds
                  : props.log.intervalSeconds
              }
              placeholder={''}
              onValueChange={value =>
                props.onLogChange({
                  ...props.log,
                  [mainTimerLabel === 'cooldown'
                    ? 'cooldownSeconds'
                    : 'intervalSeconds']: value as number,
                })
              }
              inputType={'number'}
              showAsClickable
            />
          </View>
        )}
      </View>
      {!!props.log.effort && props.log.effort > 0 && (
        <>
          <AppSlider value={props.log.effort ?? 0} disabled={false} />
          <AppText T2 xSmall style={styles.effortLabel}>
            Effort: {props.log.effort ?? 0}
          </AppText>
        </>
      )}
      <View style={defaultStyles.marginVertical} />
      {props.log.subdivisions &&
        props.log.subdivisions.map((sub, index) => (
          <View style={[styles.subdivsion]}>
            <View
              style={[defaultStyles.row, defaultStyles.spaceBetween]}
              key={props.id + 'sub_' + index}>
              <View style={defaultStyles.rotate90}>
                <ArrowDownRight />
              </View>
              <View style={defaultStyles.row}>
                <AppTextEditable
                  value={sub.repetitions}
                  placeholder={''}
                  onValueChange={value => {
                    props.onLogChange({
                      ...props.log,
                      subdivisions: props.log.subdivisions?.map((s, i) =>
                        i === index ? {...s, repetitions: value as number} : s,
                      ),
                    });
                  }}
                  inputType={'number'}
                  disabled={false}
                  showAsClickable
                />
                <View style={defaultStyles.paddingRight} />
                <AppText xSmall>x</AppText>
                <View style={defaultStyles.paddingRight} />
                <AppTextEditable
                  value={
                    (parseFloat(logValueToString(sub.logValue)) * 100) / 100
                  }
                  placeholder={''}
                  onValueChange={value => {
                    const fraction = isNaN(value as number)
                      ? undefined
                      : parseInt(value.toString().split('.')[1], 10);

                    props.onLogChange({
                      ...props.log,
                      subdivisions: props.log.subdivisions?.map((s, i) =>
                        i === index
                          ? {
                              ...s,
                              logValue: {
                                ...s.logValue,
                                base: parseInt(
                                  value.toString().split('.')[0],
                                  10,
                                ),
                                fraction,
                              },
                            }
                          : s,
                      ),
                    });
                  }}
                  inputType={'number'}
                  disabled={false}
                  showAsClickable
                />
                <View style={defaultStyles.paddingRight} />
                <AppTextEditable
                  value={sub.logValue.unit}
                  placeholder={''}
                  onValueChange={() => {}}
                  disabled
                />
                <View style={defaultStyles.paddingRight} />
                <AppTextEditable
                  value={props.exerciseMap[sub.exerciseId ?? ''] ?? ''}
                  placeholder={''}
                  onValueChange={() => {}}
                  disabled
                />
                {(!!sub.intervalSeconds || !!sub.cooldownSeconds) &&
                  mainTimerLabel === 'disabled' && (
                    <>
                      <View style={defaultStyles.paddingRight} />
                      {!!sub.intervalSeconds && <AppText T1>@</AppText>}
                      <AppTextEditable
                        value={sub.intervalSeconds || sub.cooldownSeconds}
                        placeholder={''}
                        onValueChange={value =>
                          props.onLogChange({
                            ...props.log,
                            subdivisions: props.log.subdivisions?.map(
                              (s, i) => {
                                const type =
                                  !!s.intervalSeconds && s.intervalSeconds > 0
                                    ? 'interval'
                                    : 'cooldown';
                                return i === index
                                  ? {
                                      ...s,
                                      [type === 'cooldown'
                                        ? 'cooldownSeconds'
                                        : 'intervalSeconds']: value as number,
                                    }
                                  : s;
                              },
                            ),
                          })
                        }
                        inputType={'number'}
                        showAsClickable
                      />
                      {!!sub.intervalSeconds && <AppText T1>s</AppText>}
                      {!!sub.cooldownSeconds && <AppText T1>s rest</AppText>}
                    </>
                  )}
              </View>
            </View>
            <View>
              <AppText T2 xSmall rightText style={styles.effortLabel}>
                Effort: {sub.effort ?? 0}
              </AppText>
              <AppSlider value={sub.effort ?? 0} step={5} disabled={false} />
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  repContainer: {
    width: 40,
  },
  xContainer: {
    width: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    minWidth: 40,
    marginRight: 10,
  },
  unitContainer: {
    width: 40,
  },
  exerciseContainer: {
    minWidth: 30,
    marginRight: 10,
  },
  timerContainer: {
    minWidth: 40,
  },
  effortLabel: {
    marginBottom: 5,
  },
  subdivsion: {
    backgroundColor: Constants.PRIMARY_GRADIENT[1],
    padding: 10,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    marginBottom: Constants.CONTAINER_PADDING_MARGIN,
  },
});

export default ActivityAdjustProgramBottomSheetContent;

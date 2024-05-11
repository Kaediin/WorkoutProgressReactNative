import {ProgramLogFragment} from '../../graphql/operations';
import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../common/AppText';
import Constants from '../../utils/Constants';
import {defaultStyles} from '../../utils/DefaultStyles';
import {logValueToString} from '../../utils/String';
import AppSlider from '../common/AppSlider';
import {ArrowDownRight, ChevronDown, Done} from '../../icons/svg';
import ExpandableView from '../common/ExpandableView';
import ContextMenu from 'react-native-context-menu-view';
import {getRelativeTimeIfToday} from '../../utils/Date';

interface ActivityProgramLogListItemProps {
  log: ProgramLogFragment;
  onLogPress: (log: ProgramLogFragment) => void;
  onLogEditPress: (log: ProgramLogFragment) => void;
  focussed: boolean;
  completed: boolean;
}

const ActivityProgramLogListItem: React.FC<
  ActivityProgramLogListItemProps
> = props => {
  const [expanded, setExpanded] = useState(!props.completed);

  const timerLabel = useMemo(() => {
    return props.log.intervalSeconds
      ? `${props.log.intervalSeconds}s interval`
      : props.log.cooldownSeconds
      ? `${props.log.cooldownSeconds}s rest`
      : '';
  }, [props.log.intervalSeconds, props.log.cooldownSeconds]);

  const contentHeight = useMemo(() => {
    let height = 0;
    if (props.log.effort && props.log.effort > 0) {
      height += 50;
    }
    if (props.log.subdivisions && props.log.subdivisions.length > 0) {
      height += 55 * props.log.subdivisions.length;
    }
    return height;
  }, [props.log, props.completed]);

  const item = (
    <TouchableOpacity
      style={[
        styles.container,
        defaultStyles.marginBottom,
        defaultStyles.shadow,
        props.focussed ? styles.focussed : styles.unfocussed,
        props.completed && styles.completed,
      ]}
      onPress={() => {
        if (props.completed) {
          setExpanded(!expanded);
        }
      }}>
      <View>
        {props.log.subdivisions?.some(sub => !!sub.exerciseLog?.logDateTime) ||
          (props.log.exerciseLog?.logDateTime && (
            <AppText xSmall T2 rightText>
              {getRelativeTimeIfToday(
                props.log.exerciseLog.logDateTime ||
                  props.log.subdivisions?.[0].exerciseLog.logDateTime,
              )}
            </AppText>
          ))}
        <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
          <AppText>
            {props.log.repetitions} x {logValueToString(props.log.logValue)}{' '}
            {props.log.exercise?.name ?? ''}
          </AppText>
          <View style={defaultStyles.row}>
            <AppText>{timerLabel}</AppText>
            {props.completed &&
              ((props.log.subdivisions && props.log.subdivisions.length > 0) ||
                !!props.log.effort) &&
              (!expanded ? (
                <View style={defaultStyles.paddingLeft}>
                  <ChevronDown />
                </View>
              ) : (
                <View
                  style={[defaultStyles.paddingRight, defaultStyles.rotate90]}>
                  <ChevronDown />
                </View>
              ))}
          </View>
        </View>
      </View>
      <ExpandableView showChildren={expanded} contentHeight={contentHeight}>
        {!!props.log.effort && props.log.effort > 0 && (
          <>
            <AppText xSmall T2 style={styles.effortLabel}>
              Effort: {props.log.effort}%
            </AppText>
            <AppSlider value={props.log.effort} disabled />
          </>
        )}
        {props.log.subdivisions &&
          props.log.subdivisions.length > 0 &&
          props.log.subdivisions.map((subdivision, index) => (
            <View
              key={props.log.id! + index}
              style={[
                defaultStyles.row,
                defaultStyles.spaceBetween,
                styles.subdivisionRow,
                defaultStyles.marginTop,
              ]}>
              <View style={defaultStyles.rotate90}>
                <ArrowDownRight />
              </View>
              <View>
                <AppText>
                  {subdivision.repetitions} x{' '}
                  {logValueToString(subdivision.logValue)}{' '}
                  {subdivision.exercise?.name}
                </AppText>
              </View>
            </View>
          ))}
      </ExpandableView>
    </TouchableOpacity>
  );

  if (props.completed) {
    return (
      <View style={styles.completedContainer}>
        <View>{item}</View>
        <View style={styles.containerDone}>
          <Done />
        </View>
      </View>
    );
  } else {
    return (
      <ContextMenu
        actions={[
          {
            title: 'Log as completed',
            subtitle: 'Mark this log as completed',
          },
          {
            title: 'Adjust log',
            subtitle: 'Edit log and mark as completed',
          },
        ]}
        onPress={e => {
          if (e.nativeEvent.name === 'Log as completed') {
            props.onLogPress(props.log);
          } else if (e.nativeEvent.name === 'Adjust log') {
            props.onLogEditPress(props.log);
          }
        }}
        dropdownMenuMode>
        {item}
      </ContextMenu>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
    backgroundColor: Constants.SECONDARY_GRADIENT[0],
  },
  effortLabel: {
    marginBottom: -10,
  },
  subdivisionRow: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
    backgroundColor: Constants.PRIMARY_GRADIENT[1],
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  inactive: {
    opacity: 0.4,
  },
  completed: {
    opacity: 0.4,
  },
  focussed: {
    opacity: 1,
  },
  unfocussed: {
    opacity: 0.8,
  },
  completedContainer: {
    position: 'relative',
  },
  containerDone: {
    position: 'absolute',
    alignSelf: 'center',
    top: 2,
  },
});

export default ActivityProgramLogListItem;

import {ProgramWorkoutLogFragment} from '../../graphql/operations';
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
  log: ProgramWorkoutLogFragment;
  onLogPress: (log: ProgramWorkoutLogFragment) => void;
  onLogEditPress: (log: ProgramWorkoutLogFragment) => void;
  focussed: boolean;
  completed: boolean;
  readonly?: boolean;
  status?: 'scheduled' | 'ready' | '';
}

const ActivityProgramLogListItem: React.FC<
  ActivityProgramLogListItemProps
> = props => {
  const [expanded, setExpanded] = useState(!props.completed);

  const timerLabel = useMemo(() => {
    return props.log.programLog.intervalSeconds
      ? `${props.log.programLog.intervalSeconds}s interval`
      : props.log.programLog.cooldownSeconds
      ? `${props.log.programLog.cooldownSeconds}s rest`
      : '';
  }, [
    props.log.programLog.intervalSeconds,
    props.log.programLog.cooldownSeconds,
  ]);

  const contentHeight = useMemo(() => {
    let height = 0;
    if (props.log.programLog.effort && props.log.programLog.effort > 0) {
      height += 25;
    }
    if (
      props.log.programLog.subdivisions &&
      props.log.programLog.subdivisions.length > 0
    ) {
      height += 55 * props.log.programLog.subdivisions.length;
      height +=
        20 *
        [...props.log.programLog.subdivisions].filter(sub => !!sub.effort)
          .length;
    }
    return height;
  }, [props.log, props.completed]);

  const logDateTime = useMemo(() => {
    if (!props.completed) {
      return;
    }

    if (props.log.programLog.exerciseLog?.logDateTime) {
      return props.log.programLog.exerciseLog.logDateTime;
    }

    if (props.log.programLog.subdivisions) {
      return props.log.programLog.subdivisions.map(
        sub => sub.exerciseLog?.logDateTime,
      )[0];
    }
  }, [props.log, props.completed]);

  const item = (
    <TouchableOpacity
      style={[
        styles.container,
        defaultStyles.marginBottom,
        defaultStyles.shadow,
        !props.readonly
          ? props.focussed
            ? styles.focussed
            : styles.unfocussed
          : {},
        props.completed && !props.status && props.status !== ''
          ? styles.completed
          : {},
      ]}
      onPress={() => {
        if (props.completed) {
          setExpanded(!expanded);
        }
      }}>
      <View>
        {logDateTime && (
          <AppText xSmall T2 rightText>
            {getRelativeTimeIfToday(logDateTime)}
          </AppText>
        )}
        <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
          <AppText>
            {props.log.programLog.repetitions} x{' '}
            {logValueToString(props.log.programLog.logValue)}{' '}
            {props.log.programLog.exercise?.name ?? ''}
          </AppText>
          <View style={defaultStyles.row}>
            <AppText>{timerLabel}</AppText>
            {props.completed &&
              ((props.log.programLog.subdivisions &&
                props.log.programLog.subdivisions.length > 0) ||
                !!props.log.programLog.effort) &&
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
        {!!props.log.programLog.effort && props.log.programLog.effort > 0 && (
          <>
            <AppText xSmall T2>
              Effort: {props.log.programLog.effort}%
            </AppText>
            <AppSlider value={props.log.programLog.effort} disabled />
          </>
        )}
        {props.log.programLog.subdivisions &&
          props.log.programLog.subdivisions.length > 0 &&
          props.log.programLog.subdivisions.map((subdivision, index) => (
            <View
              style={[styles.subdivisionRow, defaultStyles.marginTop]}
              key={
                'activityprogramloglistitem' + props.log.id + 'index' + index
              }>
              <View
                key={props.log.id! + index}
                style={[defaultStyles.row, defaultStyles.spaceBetween]}>
                <View style={defaultStyles.rotate90}>
                  <ArrowDownRight />
                </View>
                <View style={defaultStyles.row}>
                  <AppText>
                    {subdivision.repetitions} x{' '}
                    {logValueToString(subdivision.logValue)}{' '}
                    {subdivision.exercise?.name}
                    {subdivision.intervalSeconds
                      ? `@${subdivision.intervalSeconds}s`
                      : subdivision.cooldownSeconds
                      ? `${subdivision.cooldownSeconds}s rest`
                      : ''}
                  </AppText>
                </View>
              </View>
              {!!subdivision.effort && subdivision.effort > 0 && (
                <View style={styles.marginTopSmall}>
                  <AppText xSmall T2 rightText>
                    Effort: {subdivision.effort}%
                  </AppText>
                  <AppSlider value={subdivision.effort} disabled />
                </View>
              )}
            </View>
          ))}
      </ExpandableView>
    </TouchableOpacity>
  );

  if (props.readonly) {
    return item;
  } else if (props.completed) {
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
          // {
          //   title: 'Adjust log',
          //   subtitle: 'Edit log and mark as completed',
          // },
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
  marginTopSmall: {
    marginTop: 2,
  },
});

export default ActivityProgramLogListItem;

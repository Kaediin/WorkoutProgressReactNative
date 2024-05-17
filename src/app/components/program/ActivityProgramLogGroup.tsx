import React, {useMemo} from 'react';
import {
  ProgramWorkoutGroupFragment,
  ProgramWorkoutLogFragment,
} from '../../graphql/operations';
import ActivityProgramLogListItem from './ActivityProgramLogListItem';
import AppText from '../common/AppText';
import {View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import {enumToReadableString} from '../../utils/String';

interface ActivityProgramLogGroupProps {
  group: ProgramWorkoutGroupFragment;
  onLogPress: (log: ProgramWorkoutLogFragment) => void;
  onEditLogPress: (log: ProgramWorkoutLogFragment) => void;
  readonly: boolean;
}

const ActivityProgramLogGroup: React.FC<
  ActivityProgramLogGroupProps
> = props => {
  const isLogCompleted = (log: ProgramWorkoutLogFragment) => {
    return log.programLog.subdivisions && log.programLog.subdivisions.length > 0
      ? log.programLog.subdivisions.every(sub => !!sub.exerciseLog?.id)
      : !!log.programLog.exerciseLog?.id;
  };

  const focussedId = useMemo(() => {
    const logs = [...props.group.programWorkoutLogs];
    const focussed = logs.filter(log => !isLogCompleted(log))[0];
    return focussed ? focussed.id : undefined;
  }, [props.group.programWorkoutLogs]);

  return (
    <View style={[defaultStyles.container]}>
      <AppText h3 centerText>
        {enumToReadableString(props.group.type)}
      </AppText>
      <View style={defaultStyles.marginVertical} />
      {props.group.programWorkoutLogs.map(log => (
        <ActivityProgramLogListItem
          key={log.id}
          log={log}
          onLogPress={props.onLogPress}
          onLogEditPress={props.onEditLogPress}
          completed={isLogCompleted(log)}
          focussed={log.id === focussedId}
          readonly={props.readonly}
        />
      ))}
    </View>
  );
};

export default ActivityProgramLogGroup;

import React, {useMemo} from 'react';
import {
  ProgramLogFragment,
  ProgramLogGroupFragment,
} from '../../graphql/operations';
import ActivityProgramLogListItem from './ActivityProgramLogListItem';
import AppText from '../common/AppText';
import {View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import {enumToReadableString} from '../../utils/String';

interface ActivityProgramLogGroupProps {
  group: ProgramLogGroupFragment;
  onLogPress: (log: ProgramLogFragment) => void;
  onEditLogPress: (log: ProgramLogFragment) => void;
}

const ActivityProgramLogGroup: React.FC<
  ActivityProgramLogGroupProps
> = props => {
  const isLogCompleted = (log: ProgramLogFragment) => {
    return log.subdivisions && log.subdivisions.length > 0
      ? log.subdivisions.every(sub => !!sub.exerciseLog?.id)
      : !!log.exerciseLog?.id;
  };

  const focussedId = useMemo(() => {
    const logs = [...props.group.logs];
    const focussed = logs.filter(log => !isLogCompleted(log))[0];
    return focussed ? focussed.id : undefined;
  }, [props.group.logs]);

  return (
    <View style={[defaultStyles.container]}>
      <AppText h3 centerText>
        {enumToReadableString(props.group.type)}
      </AppText>
      <View style={defaultStyles.marginVertical} />
      {props.group.logs.map(log => (
        <ActivityProgramLogListItem
          key={log.id}
          log={log}
          onLogPress={props.onLogPress}
          onLogEditPress={props.onEditLogPress}
          completed={isLogCompleted(log)}
          focussed={log.id === focussedId}
        />
      ))}
    </View>
  );
};

export default ActivityProgramLogGroup;

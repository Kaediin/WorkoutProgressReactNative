import React, {useState} from 'react';
import {
  ExerciseLogFragment,
  GroupedExerciseLogFragment,
} from '../../graphql/operations';
import GradientBackground from '../common/GradientBackground';
import {FlatList, StyleSheet, Text} from 'react-native';
import Constants from '../../utils/Constants';
import moment from 'moment';
import {defaultStyles} from '../../utils/DefaultStyles';
import LinearGradient from 'react-native-linear-gradient';
import ContextMenu from 'react-native-context-menu-view';
import {getRelativeTimeIfToday} from '../../utils/Date';
import {ContextMenuActions} from '../../types/ContextMenuActions';

interface ExerciseLogListItemProps {
  groupedExercise: GroupedExerciseLogFragment;
  onEditLog: (log: ExerciseLogFragment) => void;
  onRemoveLog: (id: string) => void;
}

const ExerciseLogListItem: React.FC<ExerciseLogListItemProps> = ({
  groupedExercise,
  onEditLog,
  onRemoveLog,
}) => {
  const [lastLoggedDate, setLastLoggedDate] = useState<string>();

  return (
    <GradientBackground
      gradient={Constants.SECONDARY_GRADIENT}
      styles={styles.container}>
      {lastLoggedDate && (
        <Text style={defaultStyles.footnote}>
          {getRelativeTimeIfToday(lastLoggedDate)}
        </Text>
      )}
      <Text style={defaultStyles.h3}>{groupedExercise.exercise.name}</Text>
      <FlatList
        data={groupedExercise.logs}
        renderItem={({item}) => {
          const loggedDate = moment.utc(item.logDateTime).toISOString();
          if (
            !lastLoggedDate ||
            moment.utc(lastLoggedDate).isBefore(moment.utc(loggedDate))
          ) {
            setLastLoggedDate(loggedDate);
          }
          return (
            <ContextMenu
              actions={[
                {title: ContextMenuActions.EDIT},
                {title: ContextMenuActions.REMOVE},
              ]}
              onPress={e =>
                e.nativeEvent.name === ContextMenuActions.EDIT
                  ? onEditLog(item as ExerciseLogFragment)
                  : onRemoveLog(item.id)
              }>
              <LinearGradient
                colors={Constants.TERTIARY_GRADIENT}
                style={styles.containerExerciseLogRow}>
                <Text style={styles.textExerciseLogRow}>
                  {item.repetitions} x {item.weightLeft}
                  {item.unit}
                </Text>
                <Text style={defaultStyles.footnote}>
                  {getRelativeTimeIfToday(loggedDate)}
                </Text>
              </LinearGradient>
            </ContextMenu>
          );
        }}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.CONTAINER_PADDING,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    marginTop: 20,
  },
  name: {
    textAlign: 'center',
  },
  containerExerciseLogRow: {
    flexDirection: 'row',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    justifyContent: 'space-between',
    paddingHorizontal: Constants.CONTAINER_PADDING,
    marginTop: Constants.CONTAINER_PADDING,
    width: 250,
    alignSelf: 'center',
    alignItems: 'center',
  },
  textExerciseLogRow: {
    padding: Constants.CONTAINER_PADDING,
    color: 'white',
  },
});

export default ExerciseLogListItem;

import React from 'react';
import {
  ExerciseLogFragment,
  GroupedExerciseLogFragment,
} from '../../graphql/operations';
import GradientBackground from '../common/GradientBackground';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Constants from '../../utils/Constants';
import moment from 'moment';
import {defaultStyles} from '../../utils/DefaultStyles';
import LinearGradient from 'react-native-linear-gradient';
import ContextMenu from 'react-native-context-menu-view';
import {getRelativeTimeIfToday} from '../../utils/Date';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import {logValueToString} from '../../utils/String';

interface ExerciseLogListItemProps {
  groupedExercise: GroupedExerciseLogFragment;
  onEditLog: (log: ExerciseLogFragment) => void;
  onRemoveLog: (id: string) => void;
  onLogPress: (log: ExerciseLogFragment) => void;
}

const GroupedExerciseLogListItem: React.FC<ExerciseLogListItemProps> = ({
  groupedExercise,
  onEditLog,
  onRemoveLog,
  onLogPress,
}) => {
  return (
    <GradientBackground
      gradient={Constants.SECONDARY_GRADIENT}
      styles={styles.container}>
      <Text style={defaultStyles.h3}>{groupedExercise.exercise.name}</Text>
      {groupedExercise.exercise.defaultAppliedWeight && (
        <Text
          style={[
            defaultStyles.p11,
            defaultStyles.textAlignCenter,
            styles.marginSmall,
          ]}>
          +{logValueToString(groupedExercise.exercise.defaultAppliedWeight)}
        </Text>
      )}
      <FlatList
        data={groupedExercise.logs.sort(
          (a, b) =>
            new Date(a.logDateTime).getTime() -
            new Date(b.logDateTime).getTime(),
        )}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => onLogPress(item)}>
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
                  colors={
                    item.warmup
                      ? Constants.QUATERNARY_GRADIENT
                      : Constants.TERTIARY_GRADIENT
                  }
                  style={styles.containerLinearGradient}>
                  <View style={styles.containerExerciseLogRow}>
                    <Text style={styles.textExerciseLogRow}>
                      {item.repetitions} x {logValueToString(item.logValue)}
                    </Text>
                    <Text style={[defaultStyles.footnote, styles.opacity]}>
                      {getRelativeTimeIfToday(
                        moment.utc(item.logDateTime).toISOString(),
                      )}
                    </Text>
                  </View>
                  {item.remark && (
                    <Text style={[defaultStyles.footnote, styles.margin]}>
                      {item.remark}
                    </Text>
                  )}
                </LinearGradient>
              </ContextMenu>
            </TouchableOpacity>
          );
        }}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    margin: Constants.CONTAINER_PADDING_MARGIN,
  },
  name: {
    textAlign: 'center',
  },
  containerExerciseLogRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textExerciseLogRow: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
    color: 'white',
  },
  containerLinearGradient: {
    marginTop: Constants.CONTAINER_PADDING_MARGIN,
    paddingHorizontal: Constants.CONTAINER_PADDING_MARGIN,
    width: 250,
    alignSelf: 'center',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  margin: {
    marginTop: (Constants.CONTAINER_PADDING_MARGIN / 2) * -1,
    marginBottom: Constants.CONTAINER_PADDING_MARGIN / 2,
  },
  marginSmall: {
    marginTop: Constants.CONTAINER_PADDING_MARGIN / 2,
  },
  opacity: {
    opacity: 0.8,
  },
});

export default GroupedExerciseLogListItem;

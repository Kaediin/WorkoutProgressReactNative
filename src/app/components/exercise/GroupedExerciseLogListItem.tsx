import React from 'react';
import {
  ExerciseLogFragment,
  GroupedExerciseLogFragment,
} from '../../graphql/operations';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Constants from '../../utils/Constants';
import moment from 'moment';
import {defaultStyles} from '../../utils/DefaultStyles';
import ContextMenu from 'react-native-context-menu-view';
import {getRelativeTimeIfToday} from '../../utils/Date';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import {logValueToString} from '../../utils/String';
import AppText from '../common/AppText';
import AppSlider from '../common/AppSlider';

interface ExerciseLogListItemProps {
  groupedExercise: GroupedExerciseLogFragment;
  onEditLog: (log: ExerciseLogFragment) => void;
  onRepeatLog: (log: ExerciseLogFragment) => void;
  onRemoveLog: (id: string) => void;
  onLogPress: (log: ExerciseLogFragment) => void;
}

const GroupedExerciseLogListItem: React.FC<ExerciseLogListItemProps> = ({
  groupedExercise,
  onEditLog,
  onRemoveLog,
  onLogPress,
  onRepeatLog,
}) => {
  return (
    <View style={styles.container}>
      <AppText style={defaultStyles.h3}>
        {groupedExercise.exercise.name}
      </AppText>
      <View>
        {groupedExercise.exercise.notes && (
          <AppText
            style={[
              defaultStyles.p11,
              defaultStyles.textAlignCenter,
              styles.marginSmall,
            ]}>
            {groupedExercise.exercise.notes}
          </AppText>
        )}
        {groupedExercise.exercise.defaultAppliedWeight && (
          <AppText
            style={[
              defaultStyles.p11,
              defaultStyles.textAlignCenter,
              styles.marginSmall,
            ]}>
            +{logValueToString(groupedExercise.exercise.defaultAppliedWeight)}
          </AppText>
        )}
      </View>

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
                  {title: ContextMenuActions.REPEAT},
                  {title: ContextMenuActions.REMOVE, destructive: true},
                ]}
                onPress={e =>
                  e.nativeEvent.name === ContextMenuActions.EDIT
                    ? onEditLog(item as ExerciseLogFragment)
                    : e.nativeEvent.name === ContextMenuActions.REMOVE
                    ? onRemoveLog(item.id)
                    : onRepeatLog(item as ExerciseLogFragment)
                }>
                <View
                  style={[
                    styles.containerLinearGradient,
                    defaultStyles.shadow,
                  ]}>
                  <View style={styles.containerExerciseLogRow}>
                    <View>
                      <AppText style={styles.textExerciseLogRow}>
                        {item.warmup ? '•' : ''} {item.repetitions} x{' '}
                        {logValueToString(item.logValue)}{' '}
                      </AppText>
                      {item.remark && (
                        <AppText
                          style={[defaultStyles.footnote, styles.margin]}>
                          {item.remark}
                        </AppText>
                      )}
                    </View>
                    <AppText style={[defaultStyles.footnote, styles.opacity]}>
                      {getRelativeTimeIfToday(
                        moment.utc(item.logDateTime).toISOString(),
                      )}
                    </AppText>
                  </View>
                  {!!item.effort && (
                    <View style={styles.containerEffort}>
                      <AppSlider value={item.effort} disabled />
                      <AppText xSmall T2 style={styles.effortText}>
                        Effort: {item.effort}%
                      </AppText>
                    </View>
                  )}
                </View>
              </ContextMenu>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.CONTAINER_PADDING_MARGIN * 2,
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
    color: 'white',
  },
  containerLinearGradient: {
    backgroundColor: Constants.SECONDARY_GRADIENT[0],
    padding: Constants.CONTAINER_PADDING_MARGIN,
    marginTop: Constants.CONTAINER_PADDING_MARGIN,
    width: '100%',
    alignSelf: 'center',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  margin: {
    marginVertical: Constants.CONTAINER_PADDING_MARGIN / 2,
  },
  marginSmall: {
    marginTop: Constants.CONTAINER_PADDING_MARGIN / 2,
  },
  opacity: {
    color: 'white',
    opacity: 0.8,
  },
  containerEffort: {
    marginTop: Constants.CONTAINER_PADDING_MARGIN / 2,
  },
  effortText: {
    marginTop: Constants.CONTAINER_PADDING_MARGIN / 2,
  },
});

export default GroupedExerciseLogListItem;

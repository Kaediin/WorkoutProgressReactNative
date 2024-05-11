import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {ActivityStackParamList} from '../../stacks/ActivityStack';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {
  ScheduledProgramFragment,
  useDeleteScheduledProgramMutation,
  useDeleteWorkoutMutation,
  useHasActiveWorkoutQuery,
  useMyScheduledProgramQuery,
  useRestartWorkoutMutation,
  useStartWorkoutMutation,
  useUpdateScheduledProgramMutation,
  useUpdateWorkoutMutation,
  useWorkoutsQuery,
  WorkoutInput,
  WorkoutShortFragment,
  WorkoutStatus,
} from '../../graphql/operations';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import moment from 'moment';
import {nonNullable} from '../../utils/List';
import ContextMenu, {ContextMenuAction} from 'react-native-context-menu-view';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import {defaultStyles} from '../../utils/DefaultStyles';
import AppText from '../../components/common/AppText';
import WorkoutListItem from '../../components/workouts/WorkoutListItem';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import ClickableText from '../../components/common/ClickableText';
import Constants from '../../utils/Constants';
import SelectMuscleGroups from '../../components/workouts/SelectMuscleGroups';
import FloatingButton from '../../components/common/FloatingButton';
import ConfirmModal from '../../components/common/ConfirmModal';
import ScheduledProgramActivityListItem from '../../components/program/ScheduledProgramActivityListItem';
import useActivityStore from '../../stores/activityStore';
import ActivityEditScheduledProgram from '../../components/bottomSheet/ActivityEditScheduledProgram';
import {nearestFutureDate, nearestPastDate} from '../../utils/Date';

type Props = NativeStackScreenProps<ActivityStackParamList, 'ActivityOverview'>;

const ActivityScreen: React.FC<Props> = ({navigation}) => {
  // Constants
  const isFocussed = useIsFocused();
  const shouldRefetch = useActivityStore(state => state.refetchActivity);
  const setRefetchActivity = useActivityStore(
    state => state.setRefetchActivity,
  );
  const initialWorkout: WorkoutInput = {
    name: '',
    muscleGroups: [],
    zonedDateTime: '',
    remark: '',
  };

  // Refs
  const flatlistRef = useRef<FlatList>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefMuscleSelect = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefEditScheduledWorkout =
    useRef<BottomSheetModal>(null);

  // State
  const [deleteScheduledProgramId, setDeleteScheduledProgramId] =
    useState<string>('');
  const [deleteWorkoutId, setDeleteWorkoutId] = useState<string>('');
  const [editingExistingWorkoutId, setEditingExistingWorkoutId] =
    useState<string>('');
  const [activeWorkoutWarningModalOpen, setActiveWorkoutWarningModalOpen] =
    useState(false);
  const [newWorkout, setNewWorkout] = useState<WorkoutInput>(initialWorkout);
  const [editScheduledWorkout, setEditScheduledWorkout] =
    useState<ScheduledProgramFragment>();

  // GraphQL Mutations and Queries
  const [reactivateWorkout, {loading: reactivateLoading}] =
    useRestartWorkoutMutation();
  const [updateWorkout, {loading: updateWorkoutLoading}] =
    useUpdateWorkoutMutation({fetchPolicy: 'no-cache'});
  const [deleteWorkout] = useDeleteWorkoutMutation({fetchPolicy: 'no-cache'});
  const {
    data: getWorkoutsData,
    loading: getWorkoutsLoading,
    refetch: refetchWorkouts,
  } = useWorkoutsQuery({
    fetchPolicy: 'no-cache',
  });
  const [startWorkout, {data: startWorkoutData, loading: startWorkoutLoading}] =
    useStartWorkoutMutation({
      fetchPolicy: 'no-cache',
    });
  const {
    data: hasActiveWorkoutData,
    loading: hasActiveWorkoutLoading,
    refetch: refetchActiveWorkout,
  } = useHasActiveWorkoutQuery({
    fetchPolicy: 'no-cache',
  });
  const {
    data: myScheduledProgramsData,
    loading: myScheduledProgramsLoading,
    refetch: refetchPrograms,
  } = useMyScheduledProgramQuery({
    fetchPolicy: 'no-cache',
  });
  const [deleteScheduledProgram, {loading: deleteScheduledProgramLoading}] =
    useDeleteScheduledProgramMutation({
      fetchPolicy: 'no-cache',
      onCompleted: () => {
        setDeleteScheduledProgramId('');
        refetchPrograms();
      },
    });
  const [updateScheduledProgram, {loading: updateScheduledProgramLoading}] =
    useUpdateScheduledProgramMutation({
      fetchPolicy: 'no-cache',
      onCompleted: () => {
        setEditScheduledWorkout(undefined);
        refetchPrograms();
      },
    });

  // Navigation
  const navigateToWorkout = (workoutId: string): void => {
    navigation.navigate('WorkoutDetail', {workoutId});
  };

  // Start new workout
  const doStartWorkout = (): void => {
    if (newWorkout?.name) {
      startWorkout({
        variables: {
          input: {
            name: newWorkout.name,
            muscleGroups: newWorkout.muscleGroups,
            zonedDateTime: moment().toISOString(true),
            remark: newWorkout.remark,
          },
        },
      });
    }
    bottomSheetModalRef.current?.dismiss();
  };

  // Get existing workouts
  const workoutAndScheduledProgramsSorted = useMemo(() => {
    const scheduledPrograms =
      myScheduledProgramsData?.myScheduledPrograms || [];
    const workouts = getWorkoutsData?.myWorkouts || [];

    if (scheduledPrograms.length === 0 && workouts.length === 0) {
      return [];
    }

    return [...scheduledPrograms, ...workouts]
      .sort(
        (a, b) =>
          // @ts-ignore
          new Date(b.scheduledDateTime ?? b.startDateTime).getTime() -
          // @ts-ignore
          new Date(a.scheduledDateTime ?? a.startDateTime).getTime(),
      )
      .filter(nonNullable);
  }, [
    getWorkoutsData?.myWorkouts,
    myScheduledProgramsData?.myScheduledPrograms,
  ]);

  const timelineLabels: {
    past: number | null;
    future: number | null;
    offset: number;
  } = useMemo(() => {
    const allDates = [...workoutAndScheduledProgramsSorted].map(
      // @ts-ignore
      item => new Date(item.scheduledDateTime ?? item.startDateTime),
    );

    // Get the number of started workouts
    const startedWorkouts = workoutAndScheduledProgramsSorted.filter(item =>
      item.__typename === 'Workout'
        ? item.status === WorkoutStatus.STARTED
        : item.__typename === 'ScheduledProgram'
        ? item.workout.status === WorkoutStatus.STARTED
        : false,
    ).length;

    // Get the number of active programs
    const activePrograms = workoutAndScheduledProgramsSorted
      .filter(
        item =>
          item.__typename === 'ScheduledProgram' &&
          (item.workout.status === WorkoutStatus.SCHEDULED ||
            item.workout.status === WorkoutStatus.STARTED),
      )
      .filter(item =>
        moment
          .utc((item as ScheduledProgramFragment).scheduledDateTime)
          .isBefore(moment().utc(true)),
      ).length;

    // Get the number of started programs
    const startedPrograms = workoutAndScheduledProgramsSorted
      .filter(
        item =>
          item.__typename === 'ScheduledProgram' &&
          item.workout.status === WorkoutStatus.STARTED,
      )
      .filter(item =>
        moment
          .utc((item as ScheduledProgramFragment).scheduledDateTime)
          .isBefore(moment().utc(true)),
      ).length;

    const past = nearestPastDate(allDates, moment().utc(true).toDate());
    const future = nearestFutureDate(allDates, moment().utc(true).toDate());
    // Offset is the number of started workouts and active programs.
    // Subtract the number of started programs as those would be counted twice as the program and workout are both counted.
    const offset = startedWorkouts + activePrograms - startedPrograms;

    return {
      past: past === null ? null : past + offset,
      future,
      offset,
    };
  }, [workoutAndScheduledProgramsSorted]);

  // Edit existing workout
  const doEditWorkout = (): void => {
    updateWorkout({
      variables: {
        id: editingExistingWorkoutId,
        input: {
          name: newWorkout.name,
          muscleGroups: newWorkout.muscleGroups,
          zonedDateTime: newWorkout.zonedDateTime,
          remark: newWorkout.remark,
        },
      },
    });
    bottomSheetModalRef.current?.dismiss();
    refetchWorkouts();
  };

  // handle floating button click
  const onFloatingButtonClicked = (): void => {
    setNewWorkout(initialWorkout);
    setEditingExistingWorkoutId('');
    if (hasActiveWorkout) {
      setActiveWorkoutWarningModalOpen(true);
    } else {
      setActiveWorkoutWarningModalOpen(false);
      bottomSheetModalRef.current?.present();
    }
  };

  // Check if user has active workout
  const hasActiveWorkout = useMemo(
    () => hasActiveWorkoutData?.meHasActiveWorkout,
    [hasActiveWorkoutData],
  );

  // Remove workout
  const removeWorkout = (id: string): void => {
    deleteWorkout({
      variables: {
        id,
      },
    }).finally(() => {
      setDeleteWorkoutId('');
      refetchActiveWorkout();
      refetchWorkouts();
    });
  };

  // Edit workout
  const editWorkout = (workout: WorkoutShortFragment): void => {
    setEditingExistingWorkoutId(workout.id);
    setNewWorkout({
      name: workout.name,
      muscleGroups: workout.muscleGroups,
      remark: workout.remark,
      zonedDateTime: workout.startDateTime,
    });
    bottomSheetModalRef.current?.present();
  };

  // Get FAb actions for workouts
  const getWorkoutActions = (): Array<ContextMenuAction> => {
    const actions: Array<ContextMenuAction> = [
      {title: ContextMenuActions.EDIT},
    ];
    if (!hasActiveWorkout) {
      actions.push({title: ContextMenuActions.REACTIVATE_WORKOUT});
    }

    actions.push({destructive: true, title: ContextMenuActions.DELETE});
    return actions;
  };

  // Get FAB actions for Scheduled Programs
  const getScheduledProgramActions = (): Array<ContextMenuAction> => {
    const actions: Array<ContextMenuAction> = [
      {title: ContextMenuActions.EDIT},
    ];
    actions.push({destructive: true, title: ContextMenuActions.DELETE});
    return actions;
  };

  // Loading
  const anyLoading =
    startWorkoutLoading ||
    getWorkoutsLoading ||
    reactivateLoading ||
    updateWorkoutLoading ||
    hasActiveWorkoutLoading ||
    myScheduledProgramsLoading ||
    deleteScheduledProgramLoading ||
    updateScheduledProgramLoading;

  const showLoaderFlatlist = getWorkoutsLoading || myScheduledProgramsLoading;

  // Reactivate workout
  const doReactivateWorkout = (workout: WorkoutShortFragment): void => {
    reactivateWorkout({
      fetchPolicy: 'no-cache',
      variables: {
        workoutId: workout.id,
      },
      onCompleted: () => {
        refetchActiveWorkout();
        refetchWorkouts();
        navigateToWorkout(workout.id);
      },
    });
  };

  // Refetch if the screen is focussed
  useEffect(() => {
    if (isFocussed && getWorkoutsData?.myWorkouts) {
      refetchWorkouts();
      refetchActiveWorkout();
    }
  }, [isFocussed, navigation.getState()]);

  // Refetch active workout if new one is started, then navigate to the workout detail screen
  useEffect(() => {
    if (startWorkoutData?.meStartWorkout) {
      refetchActiveWorkout();
      navigateToWorkout(startWorkoutData.meStartWorkout.id);
    }
  }, [startWorkoutData?.meStartWorkout]);

  // Refetch scheduled programs if new one is added from the program screen
  useFocusEffect(
    useCallback(() => {
      if (shouldRefetch) {
        refetchWorkouts();
        refetchActiveWorkout();
        refetchPrograms();
        setRefetchActivity(false);
      }
    }, [shouldRefetch]),
  );

  // Show edit scheduled workout modal if editScheduledWorkout is set
  useEffect(() => {
    if (editScheduledWorkout) {
      bottomSheetModalRefEditScheduledWorkout.current?.present();
    } else {
      bottomSheetModalRefEditScheduledWorkout.current?.dismiss();
    }
  }, [editScheduledWorkout]);

  useEffect(() => {
    if (timelineLabels && workoutAndScheduledProgramsSorted.length > 0) {
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({
          animated: true,
          index: timelineLabels.past
            ? timelineLabels.past - timelineLabels.offset
            : 0,
        });
      }, 250);
    }
  }, [timelineLabels]);

  return (
    <GradientBackground>
      <View style={defaultStyles.flex1}>
        <FlatList
          ref={flatlistRef}
          data={workoutAndScheduledProgramsSorted}
          ListEmptyComponent={() => (
            <AppText style={defaultStyles.marginTop50} centerText>
              Click on the + to start your first workout!
            </AppText>
          )}
          onRefresh={refetchWorkouts}
          refreshing={showLoaderFlatlist}
          refreshControl={
            <RefreshControl
              colors={['#fff', '#ccc']}
              tintColor={'#fff'}
              refreshing={showLoaderFlatlist}
              onRefresh={() => {
                refetchWorkouts();
                refetchActiveWorkout();
                refetchPrograms();
              }}
            />
          }
          renderItem={item => {
            const isBorderingItem =
              timelineLabels.future === item.index
                ? 'Upcoming'
                : timelineLabels.past === item.index
                ? 'Previous'
                : null;

            return (
              <>
                {isBorderingItem === 'Previous' && (
                  <View>
                    <View style={defaultStyles.separatorWithHeight} />
                    <AppText>Past</AppText>
                  </View>
                )}
                {item.item.__typename === 'ScheduledProgram' ? (
                  <ContextMenu
                    actions={getScheduledProgramActions()}
                    onPress={event => {
                      event.nativeEvent.name === ContextMenuActions.DELETE
                        ? setDeleteScheduledProgramId(item.item.id)
                        : event.nativeEvent.name === ContextMenuActions.EDIT
                        ? setEditScheduledWorkout(
                            item.item as ScheduledProgramFragment,
                          )
                        : undefined;
                    }}
                    style={defaultStyles.shadow}>
                    <ScheduledProgramActivityListItem
                      scheduledProgram={item.item}
                      onPress={id => {
                        if (
                          item.item.workout.status === WorkoutStatus.STARTED
                        ) {
                          navigation.navigate('ProgramDetail', {
                            programId: id,
                            scheduledProgramId: item.item.id,
                            workoutId: (item.item as ScheduledProgramFragment)
                              .workout.id,
                          });
                          return;
                        }

                        const scheduledDateTime = moment
                          .utc(item.item.scheduledDateTime)
                          .local(true);

                        const status =
                          item.item.workout.status ===
                            WorkoutStatus.SCHEDULED &&
                          moment.utc().isAfter(scheduledDateTime)
                            ? 'ready'
                            : item.item.workout.status ===
                                WorkoutStatus.SCHEDULED &&
                              moment.utc().isBefore(scheduledDateTime)
                            ? 'scheduled'
                            : '';

                        navigation.navigate('ProgramPreview', {
                          programId: id,
                          scheduledProgramId: item.item.id,
                          status,
                        });
                      }}
                    />
                  </ContextMenu>
                ) : item.item.__typename === 'Workout' ? (
                  <ContextMenu
                    actions={getWorkoutActions()}
                    onPress={event => {
                      event.nativeEvent.name === ContextMenuActions.DELETE
                        ? setDeleteWorkoutId(item.item.id)
                        : event.nativeEvent.name === ContextMenuActions.EDIT
                        ? editWorkout(item.item as WorkoutShortFragment)
                        : event.nativeEvent.name ===
                          ContextMenuActions.REACTIVATE_WORKOUT
                        ? doReactivateWorkout(item.item as WorkoutShortFragment)
                        : undefined;
                    }}
                    style={defaultStyles.shadow}>
                    <WorkoutListItem
                      key={item.item.id}
                      workout={item.item as WorkoutShortFragment}
                      onWorkoutPressed={navigateToWorkout}
                      hasActiveWorkout={hasActiveWorkout || false}
                    />
                  </ContextMenu>
                ) : (
                  <></>
                )}
                {isBorderingItem === 'Upcoming' && (
                  <View>
                    <AppText>{isBorderingItem}</AppText>
                    <View style={defaultStyles.separatorWithHeight} />
                  </View>
                )}
              </>
            );
          }}
          style={defaultStyles.container}
        />

        <BottomSheetModalProvider>
          <CustomBottomSheet
            ref={bottomSheetModalRef}
            rightText={editingExistingWorkoutId ? 'Adjust' : 'Start'}
            onRightTextClicked={() =>
              editingExistingWorkoutId ? doEditWorkout() : doStartWorkout()
            }
            index={50}
            disableRightText={!newWorkout.name}>
            <View style={defaultStyles.spaceBetween}>
              <AppText style={styles.header}>Name</AppText>
              <ClickableText
                text={'Use current date'}
                onPress={(): void => {
                  setNewWorkout(prevState => ({
                    ...prevState,
                    name: moment().format('dddd, DD MMM yyyy'),
                  }));
                }}
                textAlignCenter
              />
            </View>
            <BottomSheetTextInput
              style={defaultStyles.textInputWithHeight}
              defaultValue={newWorkout.name || ''}
              placeholderTextColor={'darkgrey'}
              placeholder="Workout name"
              onChangeText={name =>
                setNewWorkout(prevState => ({...prevState, name}))
              }
              maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
            />
            <AppText style={styles.header}>Remarks</AppText>
            <BottomSheetTextInput
              defaultValue={newWorkout.remark || ''}
              onChangeText={remark =>
                setNewWorkout(prevState => ({...prevState, remark}))
              }
              style={defaultStyles.textInputWithHeight}
              placeholderTextColor={'darkgrey'}
              placeholder={'Remarks for this workout'}
            />
          </CustomBottomSheet>
          <CustomBottomSheet
            ref={bottomSheetModalRefMuscleSelect}
            onDismissClicked={() =>
              bottomSheetModalRefMuscleSelect?.current?.dismiss()
            }
            rightText={'Select'}
            onRightTextClicked={() => {
              bottomSheetModalRefMuscleSelect?.current?.dismiss();
            }}>
            <SelectMuscleGroups
              preselected={newWorkout.muscleGroups}
              onSelected={groups => {
                setNewWorkout(prevState => ({
                  ...prevState,
                  muscleGroups: groups,
                }));
              }}
              buttonText={'Select'}
            />
          </CustomBottomSheet>
          <CustomBottomSheet
            ref={bottomSheetModalRefEditScheduledWorkout}
            index={75}
            onDismissClicked={() => {
              setEditScheduledWorkout(undefined);
            }}
            rightText={'Adjust'}
            onRightTextClicked={() => {
              if (editScheduledWorkout) {
                updateScheduledProgram({
                  variables: {
                    id: editScheduledWorkout.id,
                    input: {
                      scheduleZonedDateTime: moment(
                        editScheduledWorkout.scheduledDateTime,
                      ).toISOString(true),
                      workoutName: editScheduledWorkout.workout.name,
                      remark: editScheduledWorkout.workout.remark,
                      programId: editScheduledWorkout.program.id,
                      zonedDateTime: moment().toISOString(true),
                    },
                  },
                });
              }
            }}>
            {editScheduledWorkout && (
              <ActivityEditScheduledProgram
                scheduledProgram={editScheduledWorkout}
                onChangeScheduledProgram={setEditScheduledWorkout}
              />
            )}
          </CustomBottomSheet>
          {!anyLoading && !hasActiveWorkout && (
            <FloatingButton onClick={onFloatingButtonClicked} />
          )}
        </BottomSheetModalProvider>
        <ConfirmModal
          message={
            'You still have an active workout. Starting a new one will automatically end it.'
          }
          isOpen={activeWorkoutWarningModalOpen}
          type={'WARNING'}
          onDismiss={() => {
            setActiveWorkoutWarningModalOpen(false);
            bottomSheetModalRef.current?.present();
          }}
        />
        <ConfirmModal
          message={'Are you sure you want to remove this workout?'}
          isOpen={!!deleteWorkoutId}
          type={'WARNING'}
          onDismiss={() => setDeleteWorkoutId('')}
          onConfirm={() => removeWorkout(deleteWorkoutId)}
        />
        <ConfirmModal
          message={'Are you sure you want to remove this scheduled workout?'}
          isOpen={!!deleteScheduledProgramId}
          type={'WARNING'}
          onDismiss={() => setDeleteScheduledProgramId('')}
          onConfirm={() =>
            deleteScheduledProgram({
              variables: {
                id: deleteScheduledProgramId,
              },
            })
          }
          disabledConfirm={deleteScheduledProgramLoading}
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    margin: Constants.CONTAINER_PADDING_MARGIN,
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default ActivityScreen;

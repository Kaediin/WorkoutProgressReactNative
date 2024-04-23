import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  useDeleteWorkoutMutation,
  useHasActiveWorkoutQuery,
  useRestartWorkoutMutation,
  useStartWorkoutMutation,
  useUpdateWorkoutMutation,
  useWorkoutsQuery,
  WorkoutInput,
  WorkoutShortFragment,
} from '../../graphql/operations';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import moment from 'moment/moment';
import {nonNullable} from '../../utils/List';
import ContextMenu, {ContextMenuAction} from 'react-native-context-menu-view';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import AppText from '../../components/common/AppText';
import WorkoutListItem from '../../components/workouts/WorkoutListItem';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import ClickableText from '../../components/common/ClickableText';
import Constants from '../../utils/Constants';
import SelectMuscleGroups from '../../components/workouts/SelectMuscleGroups';
import FloatingButton from '../../components/common/FloatingButton';
import ConfirmModal from '../../components/common/ConfirmModal';

interface WorkoutOverviewProps {
  onNavigateToWorkout: (workoutId: string) => void;
  setNavTitle: (title: string) => void;
}

const WorkoutOverview: React.FC<WorkoutOverviewProps> = props => {
  const isFocussed = useIsFocused();
  const [deleteWorkoutId, setDeleteWorkoutId] = useState<string>('');
  const [editingExistingWorkoutId, setEditingExistingWorkoutId] =
    useState<string>('');
  const [activeWorkoutWarningModalOpen, setActiveWorkoutWarningModalOpen] =
    useState(false);

  const initialWorkout: WorkoutInput = {
    name: '',
    muscleGroups: [],
    zonedDateTime: '',
    remark: '',
  };

  const [newWorkout, setNewWorkout] = useState<WorkoutInput>(initialWorkout);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefMuscleSelect = useRef<BottomSheetModal>(null);

  const {
    data: getWorkoutsData,
    loading: getWorkoutsLoading,
    refetch: refetchWorkouts,
  } = useWorkoutsQuery({
    fetchPolicy: 'no-cache',
  });

  const [reactivateWorkout, {loading: reactivateLoading}] =
    useRestartWorkoutMutation();
  const [updateWorkout, {loading: updateWorkoutLoading}] =
    useUpdateWorkoutMutation({fetchPolicy: 'no-cache'});

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

  const [deleteWorkout] = useDeleteWorkoutMutation({fetchPolicy: 'no-cache'});

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

  const existingWorkouts = useMemo(() => {
    return [
      ...((getWorkoutsData?.myWorkouts &&
        getWorkoutsData.myWorkouts.filter(nonNullable)) ||
        []),
    ].filter(nonNullable);
  }, [getWorkoutsData?.myWorkouts]);

  useEffect(() => {
    if (startWorkoutData?.meStartWorkout) {
      refetchActiveWorkout();
      props.onNavigateToWorkout(startWorkoutData.meStartWorkout.id);
    }
  }, [startWorkoutData?.meStartWorkout]);

  useEffect(() => {
    if (isFocussed && getWorkoutsData?.myWorkouts) {
      refetchWorkouts();
      refetchActiveWorkout();
    }
  }, [isFocussed]);

  useEffect(() => {
    props.setNavTitle('Workouts');
  }, []);

  const loading =
    startWorkoutLoading ||
    getWorkoutsLoading ||
    reactivateLoading ||
    updateWorkoutLoading ||
    hasActiveWorkoutLoading;

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

  const hasActiveWorkout = useMemo(
    () => hasActiveWorkoutData?.meHasActiveWorkout,
    [hasActiveWorkoutData],
  );
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

  const getActions = (): Array<ContextMenuAction> => {
    const actions: Array<ContextMenuAction> = [
      {title: ContextMenuActions.EDIT},
    ];
    if (!hasActiveWorkout) {
      actions.push({title: ContextMenuActions.REACTIVATE_WORKOUT});
    }

    actions.push({destructive: true, title: ContextMenuActions.DELETE});
    return actions;
  };

  const doReactivateWorkout = (workout: WorkoutShortFragment): void => {
    reactivateWorkout({
      fetchPolicy: 'no-cache',
      variables: {
        workoutId: workout.id,
      },
      onCompleted: () => {
        refetchActiveWorkout();
        refetchWorkouts();
        props.onNavigateToWorkout(workout.id);
      },
    });
  };

  return (
    <View style={defaultStyles.flex1}>
      <FlatList
        data={existingWorkouts}
        ListEmptyComponent={() => (
          <AppText style={defaultStyles.marginTop50} centerText>
            Click on the + to start your first workout!
          </AppText>
        )}
        refreshing={getWorkoutsLoading}
        refreshControl={
          <RefreshControl
            colors={['#fff', '#ccc']}
            tintColor={'#fff'}
            refreshing={getWorkoutsLoading}
            onRefresh={() => {
              refetchWorkouts();
              refetchActiveWorkout();
            }}
          />
        }
        renderItem={({item}) => (
          <ContextMenu
            actions={getActions()}
            onPress={event => {
              event.nativeEvent.name === ContextMenuActions.DELETE
                ? setDeleteWorkoutId(item.id)
                : event.nativeEvent.name === ContextMenuActions.EDIT
                ? editWorkout(item)
                : event.nativeEvent.name ===
                  ContextMenuActions.REACTIVATE_WORKOUT
                ? doReactivateWorkout(item)
                : undefined;
            }}
            style={defaultStyles.shadow}>
            <WorkoutListItem
              key={item.id}
              workout={item}
              onWorkoutPressed={props.onNavigateToWorkout}
              hasActiveWorkout={hasActiveWorkout || false}
            />
          </ContextMenu>
        )}
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
        {!loading && !hasActiveWorkout && (
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    margin: Constants.CONTAINER_PADDING_MARGIN,
    fontWeight: 'bold',
    color: 'grey',
  },
  heading2: {
    fontSize: 18,
    margin: Constants.CONTAINER_PADDING_MARGIN,
    fontWeight: 'bold',
  },
  containerTitle: {
    backgroundColor: 'lightgrey',
    padding: Constants.CONTAINER_PADDING_MARGIN,
    marginTop: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  button: {
    marginTop: 20,
  },
});

export default WorkoutOverview;

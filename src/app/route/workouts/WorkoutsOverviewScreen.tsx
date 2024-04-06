import React, {useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {
  useDeleteWorkoutMutation,
  useEndWorkoutMutation,
  useHasActiveWorkoutQuery,
  useRestartWorkoutMutation,
  useStartWorkoutMutation,
  useUpdateWorkoutMutation,
  useWorkoutsQuery,
  WorkoutInput,
  WorkoutShortFragment,
} from '../../graphql/operations';
import FloatingButton from '../../components/common/FloatingButton';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import SelectMuscleGroups from '../../components/workouts/SelectMuscleGroups';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import moment from 'moment';
import Constants from '../../utils/Constants';
import {nonNullable} from '../../utils/List';
import ErrorMessage from '../../components/common/ErrorMessage';
import WorkoutListItem from '../../components/workouts/WorkoutListItem';
import PopupModal from '../../components/common/PopupModal';
import {WorkoutStackParamList} from '../../stacks/WorkoutStack';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import ContextMenu, {ContextMenuAction} from 'react-native-context-menu-view';
import {defaultStyles} from '../../utils/DefaultStyles';
import ClickableText from '../../components/common/ClickableText';
import Loader from '../../components/common/Loader';
import {useIsFocused} from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import AppText from '../../components/common/AppText';
import useTimerStore from '../../stores/timerStore';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutsOverview'>;

const WorkoutsOverviewScreen: React.FC<Props> = ({navigation}) => {
  const {getToken} = useAuth();

  const startTimer = useTimerStore(state => state.startTimer);
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
    error: getWorkoutsError,
    refetch: refetchWorkouts,
  } = useWorkoutsQuery({
    fetchPolicy: 'no-cache',
  });
  const [endWorkout, {loading: endWorkoutLoading}] = useEndWorkoutMutation();
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
      navigateToWorkout(startWorkoutData.meStartWorkout.id);
    }
  }, [startWorkoutData?.meStartWorkout]);

  useEffect(() => {
    if (isFocussed && getWorkoutsData?.myWorkouts) {
      refetchWorkouts();
      refetchActiveWorkout();
    }
  }, [isFocussed]);

  const loading =
    startWorkoutLoading ||
    getWorkoutsLoading ||
    endWorkoutLoading ||
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

  const navigateToWorkout = (id: string): void => {
    navigation.navigate('WorkoutDetail', {workoutId: id});
  };

  const removeWorkout = (id: string): void => {
    deleteWorkout({
      variables: {
        id,
      },
    }).finally(() => {
      startTimer(false);
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

  const getActions = (
    workout: WorkoutShortFragment,
  ): Array<ContextMenuAction> => {
    const actions: Array<ContextMenuAction> = [
      {title: ContextMenuActions.EDIT},
    ];
    if (!hasActiveWorkout) {
      actions.push({title: ContextMenuActions.REACTIVATE_WORKOUT});
    }
    if (workout.active) {
      actions.push({destructive: true, title: ContextMenuActions.END_WORKOUT});
    }
    actions.push({destructive: true, title: ContextMenuActions.DELETE});
    return actions;
  };

  const doEndWorkout = (workout: WorkoutShortFragment): void => {
    endWorkout({
      fetchPolicy: 'no-cache',
      variables: {
        workoutId: workout.id,
        zonedDateTimeString: moment().toISOString(true),
      },
    });
    startTimer(false);
    refetchActiveWorkout();
    refetchWorkouts();
  };

  const doReactivateWorkout = (workout: WorkoutShortFragment): void => {
    reactivateWorkout({
      fetchPolicy: 'no-cache',
      variables: {
        workoutId: workout.id,
      },
    });
    refetchActiveWorkout();
    refetchWorkouts();
  };

  return (
    <GradientBackground>
      {getWorkoutsError?.message ? (
        <ErrorMessage message={getWorkoutsError?.message} onRetry={getToken} />
      ) : loading ? (
        <Loader isLoading={loading} />
      ) : existingWorkouts.length === 0 ? (
        <View style={styles.centerContent}>
          <AppText>Click on the + to start your first workout!</AppText>
        </View>
      ) : (
        <FlatList
          data={existingWorkouts}
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
              actions={getActions(item)}
              onPress={event => {
                event.nativeEvent.name === ContextMenuActions.DELETE
                  ? setDeleteWorkoutId(item.id)
                  : event.nativeEvent.name === ContextMenuActions.EDIT
                  ? editWorkout(item)
                  : event.nativeEvent.name === ContextMenuActions.END_WORKOUT
                  ? doEndWorkout(item)
                  : event.nativeEvent.name ===
                    ContextMenuActions.REACTIVATE_WORKOUT
                  ? doReactivateWorkout(item)
                  : undefined;
              }}
              style={defaultStyles.shadow}>
              <WorkoutListItem
                key={item.id}
                workout={item}
                onWorkoutPressed={navigateToWorkout}
                hasActiveWorkout={hasActiveWorkout || false}
              />
            </ContextMenu>
          )}
          style={defaultStyles.container}
        />
      )}

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
      <PopupModal
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
      <PopupModal
        message={'Are you sure you want to remove this workout?'}
        isOpen={!!deleteWorkoutId}
        type={'WARNING'}
        onDismiss={() => setDeleteWorkoutId('')}
        onConfirm={() => removeWorkout(deleteWorkoutId)}
      />
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
  heading2: {
    fontSize: 18,
    margin: Constants.CONTAINER_PADDING_MARGIN,
    fontWeight: 'bold',
  },
  centerContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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

export default WorkoutsOverviewScreen;

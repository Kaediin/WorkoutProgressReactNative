import React, {useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {
  useDeleteWorkoutMutation,
  useHasActiveWorkoutQuery,
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
import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import moment from 'moment';
import Constants from '../../utils/Constants';
import {nonNullable} from '../../utils/List';
import ErrorMessage from '../../components/common/ErrorMessage';
import WorkoutListItem from '../../components/workouts/WorkoutListItem';
import PopupModal from '../../components/common/PopupModal';
import {WorkoutStackParamList} from '../../stacks/WorkoutStack';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import ContextMenu from 'react-native-context-menu-view';
import {defaultStyles} from '../../utils/DefaultStyles';
import ClickableText from '../../components/common/ClickableText';
import MuscleGroupList from '../../components/workouts/MuscleGroupList';
import usePreferenceStore from '../../stores/preferenceStore';
import Loader from '../../components/common/Loader';
import {useIsFocused} from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutsOverview'>;

const WorkoutsOverviewScreen: React.FC<Props> = ({navigation}) => {
  const {getToken} = useAuth();

  const autoSelectMuscleGroups = usePreferenceStore(
    state => state.preference,
  )?.autoAdjustWorkoutMuscleGroups;

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
  const [updateWorkout] = useUpdateWorkoutMutation({fetchPolicy: 'no-cache'});

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

  const {data: hasActiveWorkoutData, refetch: refetchActiveWorkout} =
    useHasActiveWorkoutQuery({
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

  const loading = startWorkoutLoading || getWorkoutsLoading;

  const onFloatingButtonClicked = (): void => {
    setNewWorkout(initialWorkout);
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

  return (
    <GradientBackground>
      {getWorkoutsError?.message ? (
        <ErrorMessage message={getWorkoutsError?.message} onRetry={getToken} />
      ) : loading ? (
        <Loader isLoading={loading} />
      ) : existingWorkouts.length === 0 ? (
        <View style={styles.centerContent}>
          <Text>Click on the + to start your first workout!</Text>
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
              actions={[
                {title: ContextMenuActions.DELETE},
                {title: ContextMenuActions.EDIT},
              ]}
              onPress={event => {
                event.nativeEvent.name === ContextMenuActions.DELETE
                  ? setDeleteWorkoutId(item.id)
                  : editWorkout(item);
              }}>
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
          rightText={'Start'}
          onRightTextClicked={() =>
            editingExistingWorkoutId ? doEditWorkout() : doStartWorkout()
          }
          index={50}>
          <Text style={styles.header}>Name</Text>
          <View style={styles.containerTitle}>
            <TextInput
              style={styles.heading2}
              value={newWorkout.name}
              placeholder="Workout name"
              onChangeText={name =>
                setNewWorkout(prevState => ({...prevState, name}))
              }
              maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
            />
            <Button
              title={'Use current date'}
              onPress={(): void => {
                setNewWorkout(prevState => ({
                  ...prevState,
                  name: moment().format('dddd, DD MMM yyyy'),
                }));
              }}
            />
          </View>
          {!autoSelectMuscleGroups && (
            <>
              <Text style={styles.header}>Muscle groups</Text>
              <ClickableText
                text={'Select'}
                onPress={bottomSheetModalRefMuscleSelect?.current?.present}
                styles={defaultStyles.textAlignCenter}
              />
              <MuscleGroupList
                muscleGroups={newWorkout.muscleGroups}
                pillColor="#00C5ED"
                textColor="white"
              />
            </>
          )}
          <BottomSheetTextInput
            defaultValue={newWorkout.remark || ''}
            onChangeText={remark =>
              setNewWorkout(prevState => ({...prevState, remark}))
            }
            style={defaultStyles.textInputWithHeight}
            placeholder={'Remarks for this workout'}
          />
        </CustomBottomSheet>
        <CustomBottomSheet
          ref={bottomSheetModalRefMuscleSelect}
          onDismissClicked={() =>
            bottomSheetModalRefMuscleSelect?.current?.dismiss()
          }>
          <SelectMuscleGroups
            preselected={newWorkout.muscleGroups}
            onSelected={groups => {
              setNewWorkout(prevState => ({
                ...prevState,
                muscleGroups: groups,
              }));
              // setSelectedMuscleGroups(groups);
              bottomSheetModalRefMuscleSelect?.current?.dismiss();
              bottomSheetModalRef?.current?.present();
            }}
            buttonText={'Select'}
          />
        </CustomBottomSheet>
        <FloatingButton onClick={onFloatingButtonClicked} />
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
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
  },
  heading2: {
    fontSize: 18,
    margin: Constants.CONTAINER_PADDING_MARGIN,
    textAlign: 'center',
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
    margin: 2,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  button: {
    marginTop: 20,
  },
});

export default WorkoutsOverviewScreen;

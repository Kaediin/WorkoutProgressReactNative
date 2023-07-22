import React, {useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {
  MuscleGroup,
  useDeleteWorkoutMutation,
  useHasActiveWorkoutLazyQuery,
  useStartWorkoutMutation,
  useWorkoutsQuery,
  WorkoutInput,
  WorkoutShortFragment,
} from '../../graphql/operations';
import FloatingButton from '../../components/common/FloatingButton';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import SelectMuscleGroups from '../../components/workouts/SelectMuscleGroups';
import {
  ActivityIndicator,
  Button,
  FlatList,
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

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutsOverview'>;

const WorkoutsOverviewScreen: React.FC<Props> = ({route, navigation}) => {
  const [activeWorkoutWarningModalOpen, setActiveWorkoutWarningModalOpen] =
    useState(false);

  const [newWorkout, setNewWorkout] = useState<WorkoutInput>({
    name: '',
    muscleGroups: [],
    zonedDateTime: '',
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const onSelectWorkoutMuscleGroups = (groups: MuscleGroup[]): void => {
    if (newWorkout?.name && groups.length > 0) {
      startWorkout({
        variables: {
          input: {
            name: newWorkout.name,
            muscleGroups: groups,
            zonedDateTime: moment().toISOString(true),
          },
        },
      });
    }
    bottomSheetModalRef.current?.dismiss();
  };

  const {
    data: getWorkoutsData,
    loading: getWorkoutsLoading,
    error: getWorkoutsError,
    refetch: refetchWorkouts,
  } = useWorkoutsQuery({
    fetchPolicy: 'no-cache',
  });

  const [deleteWorkout] = useDeleteWorkoutMutation({fetchPolicy: 'no-cache'});

  const [startWorkout, {data: startWorkoutData, loading: startWorkoutLoading}] =
    useStartWorkoutMutation({
      fetchPolicy: 'no-cache',
    });

  const [hasActiveWorkout, {data: hasActiveWorkoutData}] =
    useHasActiveWorkoutLazyQuery({fetchPolicy: 'no-cache'});

  const existingWorkouts = useMemo(() => {
    return [
      ...((getWorkoutsData?.myWorkouts &&
        getWorkoutsData.myWorkouts.filter(nonNullable)) ||
        []),
    ].filter(nonNullable);
  }, [getWorkoutsData?.myWorkouts]);

  useEffect(() => {
    if (startWorkoutData?.meStartWorkout) {
      refetchWorkouts();
    }
  }, [startWorkoutData?.meStartWorkout]);

  const loading = startWorkoutLoading || getWorkoutsLoading;

  const onFloatingButtonClicked = (): void => {
    hasActiveWorkout();
  };

  useEffect(() => {
    if (hasActiveWorkoutData?.meHasActiveWorkout) {
      setActiveWorkoutWarningModalOpen(true);
    } else if (hasActiveWorkoutData?.meHasActiveWorkout === false) {
      setActiveWorkoutWarningModalOpen(false);
      bottomSheetModalRef.current?.present();
    }
  }, [hasActiveWorkoutData]);

  useEffect(() => {
    // @ts-ignore
    if (route.params?.cameFrom) {
      refetchWorkouts();
    }
    // @ts-ignore
  }, [route.params?.cameFrom]);

  const navigateToWorkout = (id: string): void => {
    navigation.navigate('WorkoutDetail', {workoutId: id});
  };

  const removeWorkout = (workout: WorkoutShortFragment): void => {
    deleteWorkout({
      variables: {
        id: workout.id,
      },
    }).finally(() => refetchWorkouts());
  };

  return (
    <GradientBackground>
      {getWorkoutsError?.message ? (
        <ErrorMessage message={getWorkoutsError?.message} />
      ) : loading ? (
        <ActivityIndicator style={styles.centerContent} size="large" />
      ) : existingWorkouts.length === 0 ? (
        <View style={styles.centerContent}>
          <Text>Click on the + to start your first workout!</Text>
        </View>
      ) : (
        <FlatList
          data={existingWorkouts}
          renderItem={({item}) => (
            <ContextMenu
              actions={[{title: ContextMenuActions.REMOVE}]}
              onPress={() => removeWorkout(item)}>
              <WorkoutListItem
                key={item.id}
                workout={item}
                onWorkoutPressed={navigateToWorkout}
              />
            </ContextMenu>
          )}
          style={defaultStyles.container}
        />
      )}

      <BottomSheetModalProvider>
        <CustomBottomSheet ref={bottomSheetModalRef}>
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
          <Text style={styles.header}>Muscle groups</Text>
          <SelectMuscleGroups
            onConfirm={onSelectWorkoutMuscleGroups}
            buttonText={'Start'}
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
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    margin: Constants.CONTAINER_PADDING,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
  },
  heading2: {
    fontSize: 18,
    margin: Constants.CONTAINER_PADDING,
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
    padding: Constants.CONTAINER_PADDING,
    margin: Constants.CONTAINER_PADDING,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
});

export default WorkoutsOverviewScreen;

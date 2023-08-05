import React, {useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {
  MuscleGroup,
  useDeleteWorkoutMutation,
  useHasActiveWorkoutQuery,
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
import GradientButton from '../../components/common/GradientButton';
import usePreferenceStore from '../../stores/preferenceStore';
import Loader from '../../components/common/Loader';
import {useIsFocused} from '@react-navigation/native';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutsOverview'>;

const WorkoutsOverviewScreen: React.FC<Props> = ({navigation}) => {
  const autoSelectMuscleGroups = usePreferenceStore(
    state => state.preference,
  )?.autoAdjustWorkoutMuscleGroups;

  const isFocussed = useIsFocused();
  const [remark, setRemark] = useState<string>();
  const [activeWorkoutWarningModalOpen, setActiveWorkoutWarningModalOpen] =
    useState(false);

  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
    MuscleGroup[]
  >([]);
  const [newWorkout, setNewWorkout] = useState<WorkoutInput>({
    name: '',
    muscleGroups: [],
    zonedDateTime: '',
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefMuscleSelect = useRef<BottomSheetModal>(null);

  const doStartWorkout = (): void => {
    if (newWorkout?.name) {
      startWorkout({
        variables: {
          input: {
            name: newWorkout.name,
            muscleGroups: selectedMuscleGroups || [],
            zonedDateTime: moment().toISOString(true),
            remark,
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
    }
  }, [isFocussed]);

  const loading = startWorkoutLoading || getWorkoutsLoading;

  const onFloatingButtonClicked = (): void => {
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
              onRefresh={refetchWorkouts}
            />
          }
          renderItem={({item}) => (
            <ContextMenu
              actions={[{title: ContextMenuActions.REMOVE}]}
              onPress={() => removeWorkout(item)}>
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
          {!autoSelectMuscleGroups && (
            <>
              <Text style={styles.header}>Muscle groups</Text>
              <ClickableText
                text={'Select'}
                onPress={bottomSheetModalRefMuscleSelect?.current?.present}
                styles={defaultStyles.textAlignCenter}
              />
              <MuscleGroupList
                muscleGroups={selectedMuscleGroups}
                pillColor="#00C5ED"
                textColor="white"
              />
            </>
          )}
          <TextInput
            onChangeText={setRemark}
            style={defaultStyles.textAreaInput}
            placeholder={'Remarks for this workout'}
            multiline
          />
          <GradientButton
            styles={styles.button}
            title={'Start workout'}
            onClick={doStartWorkout}
          />
        </CustomBottomSheet>
        <CustomBottomSheet
          ref={bottomSheetModalRefMuscleSelect}
          onCloseClicked={() =>
            bottomSheetModalRefMuscleSelect?.current?.dismiss()
          }>
          <SelectMuscleGroups
            preselected={selectedMuscleGroups}
            onSelected={groups => {
              setSelectedMuscleGroups(groups);
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

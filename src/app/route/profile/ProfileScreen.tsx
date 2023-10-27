import React, {useEffect, useMemo, useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import CreateExerciseModal from '../../components/bottomSheet/CreateExerciseModal';
import {
  ExerciseFragment,
  useDeleteExerciseMutation,
  useMyExercisesQuery,
} from '../../graphql/operations';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ExerciseProfileListItem from '../../components/exercise/ExerciseProfileListItem';
import {defaultStyles} from '../../utils/DefaultStyles';
import Constants from '../../utils/Constants';
import ClickableText from '../../components/common/ClickableText';
import ContextMenu from 'react-native-context-menu-view';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import Preferences from '../../components/profile/Preferences';
import SinglePicker from '../../components/bottomSheet/SinglePicker';
import Loader from '../../components/common/Loader';
import ExpandableView from '../../components/common/ExpandableView';
import PopupModal from '../../components/common/PopupModal';

const ProfileScreen: React.FC = () => {
  const [deleteExerciseId, setDeleteExerciseId] = useState('');
  const [createExerciseModalActive, setCreateExerciseModalActive] =
    useState(false);
  const [editExercise, setEditExercise] = useState<ExerciseFragment>();
  const [deleteExercise, {loading: deleteExerciseLoading}] =
    useDeleteExerciseMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data?.deleteExercise) {
          refetchExercises();
        }
      },
    });
  const [adjustDefaultRepetitions, setAdjustDefaultRepetitions] =
    useState(false);
  const [repetitions, setRepetitions] = useState<number>();
  const [nRepetitions, setNRepetitions] = useState<number>();

  const {
    data: exercisesData,
    loading: exercisesDataLoading,
    refetch: refetchExercises,
  } = useMyExercisesQuery({fetchPolicy: 'no-cache'});

  const exercises = useMemo(
    () => exercisesData?.myExercises,
    [exercisesData?.myExercises],
  );

  const onDeleteExercise = (id: string): void => {
    deleteExercise({
      variables: {
        id,
      },
    });
  };

  useEffect(() => {
    if (editExercise) {
      setCreateExerciseModalActive(true);
    }
  }, [editExercise]);

  const [showExercises, setShowExercises] = useState(false);

  return (
    <GradientBackground>
      <View style={defaultStyles.container}>
        {exercisesDataLoading ? (
          <Loader isLoading={exercisesDataLoading} />
        ) : (
          <ScrollView>
            <Preferences
              onDefaultRepetitionClicked={() =>
                setAdjustDefaultRepetitions(true)
              }
              onSetRepetitions={setRepetitions}
              changedRepetition={nRepetitions}
            />
            <View style={styles.exercisesHeader}>
              <Text style={defaultStyles.h2}>Exercises</Text>
              <ClickableText
                text={showExercises ? 'Hide' : 'Show'}
                onPress={() => setShowExercises(!showExercises)}
                styles={styles.exercisesToggle}
              />
              <ClickableText
                text={'Create'}
                onPress={() => {
                  setEditExercise(undefined);
                  setCreateExerciseModalActive(true);
                }}
                styles={styles.exercisesCreateText}
              />
            </View>
            {deleteExerciseLoading ? (
              <Loader isLoading={deleteExerciseLoading} />
            ) : (
              <ExpandableView
                showChildren={showExercises}
                contentHeight={175 * (exercises?.length ?? 0)}>
                <>
                  {exercises?.map(exercise => (
                    <ContextMenu
                      key={exercise.id}
                      actions={[
                        {title: ContextMenuActions.EDIT},
                        {title: ContextMenuActions.REMOVE},
                      ]}
                      onPress={e =>
                        e.nativeEvent.name === ContextMenuActions.EDIT
                          ? setEditExercise(exercise)
                          : setDeleteExerciseId(exercise.id)
                      }>
                      <ExerciseProfileListItem exercise={exercise} />
                    </ContextMenu>
                  ))}
                </>
              </ExpandableView>
            )}
          </ScrollView>
        )}
      </View>
      <SinglePicker
        active={adjustDefaultRepetitions}
        onDismiss={() => setAdjustDefaultRepetitions(false)}
        pickerValue={
          nRepetitions || repetitions || Constants.DEFAULT_REPETITIONS
        }
        onPickerSelect={value => setNRepetitions(+value)}
        pickerOptions={Constants.BOTTOM_SHEET_SNAPPOINTS.map(
          value => +value.replace('%', ''),
        )}
      />
      <CreateExerciseModal
        active={createExerciseModalActive}
        onDismiss={added => {
          setCreateExerciseModalActive(false);
          setEditExercise(undefined);
          if (added) {
            refetchExercises();
          }
        }}
        existingExercise={editExercise}
        onUpdate={refetchExercises}
      />
      <PopupModal
        message={'Are you sure you want to delete this workout?'}
        isOpen={Boolean(deleteExerciseId)}
        type={'WARNING'}
        onDismiss={() => setDeleteExerciseId('')}
        onConfirm={() => {
          onDeleteExercise(deleteExerciseId);
          setDeleteExerciseId('');
        }}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  exercisesHeader: {
    position: 'relative',
  },
  exercisesCreateText: {
    position: 'absolute',
    right: Constants.CONTAINER_PADDING_MARGIN,
    top: Constants.CONTAINER_PADDING_MARGIN * -2,
  },
  exercisesToggle: {
    position: 'absolute',
    left: Constants.CONTAINER_PADDING_MARGIN,
    top: Constants.CONTAINER_PADDING_MARGIN * -2,
  },
});

export default ProfileScreen;

import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import {FlatList} from 'react-native';
import {
  ExerciseFragment,
  useDeleteExerciseMutation,
  useMyExercisesQuery,
} from '../../graphql/operations';
import Loader from '../../components/common/Loader';
import ContextMenu from 'react-native-context-menu-view';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import ExerciseProfileListItem from '../../components/exercise/ExerciseProfileListItem';
import CreateExerciseModal from '../../components/bottomSheet/CreateExerciseModal';
import PopupModal from '../../components/common/PopupModal';
import HeaderLabel from '../../components/nav/headerComponents/EndWorkout';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../stacks/ProfileStack';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ExercisesScreen'>;

const ExercisesScreen: React.FC<Props> = props => {
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

  const {
    data: exercisesData,
    loading: exercisesDataLoading,
    refetch: refetchExercises,
  } = useMyExercisesQuery({fetchPolicy: 'no-cache'});

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

  props.navigation.setOptions({
    headerRight: () => (
      <HeaderLabel
        label={'Create'}
        onPress={() => setCreateExerciseModalActive(true)}
      />
    ),
  });

  return (
    <GradientBackground>
      {exercisesDataLoading || deleteExerciseLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={
            exercisesData?.myExercises
              ? exercisesData.myExercises.sort((a, b) =>
                  a.name.localeCompare(b.name),
                )
              : []
          }
          renderItem={({item}) => {
            return (
              <ContextMenu
                key={item.id}
                actions={[
                  {title: ContextMenuActions.EDIT},
                  {title: ContextMenuActions.REMOVE},
                ]}
                onPress={e =>
                  e.nativeEvent.name === ContextMenuActions.EDIT
                    ? setEditExercise(item)
                    : setDeleteExerciseId(item.id)
                }>
                <ExerciseProfileListItem exercise={item} />
              </ContextMenu>
            );
          }}
        />
      )}
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
        message={'Are you sure you want to delete this exercise?'}
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

export default ExercisesScreen;

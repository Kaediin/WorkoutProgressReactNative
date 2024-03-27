import React, {useEffect, useRef, useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  ExerciseFragment,
  MuscleGroup,
  useDeleteExerciseMutation,
  useMyExercisesQuery,
} from '../../graphql/operations';
import Loader from '../../components/common/Loader';
import ContextMenu from 'react-native-context-menu-view';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import ExerciseProfileListItem from '../../components/exercise/ExerciseProfileListItem';
import CreateExerciseModal from '../../components/bottomSheet/CreateExerciseModal';
import PopupModal from '../../components/common/PopupModal';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../stacks/ProfileStack';
import GradientButton from '../../components/common/GradientButton';
import {defaultStyles} from '../../utils/DefaultStyles';
import Constants from '../../utils/Constants';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import SelectMuscleGroups from '../../components/workouts/SelectMuscleGroups';
import {nonNullable} from '../../utils/List';
import HeaderLabel from '../../components/nav/headerComponents/HeaderLabel';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ExercisesScreen'>;

const ExercisesScreen: React.FC<Props> = props => {
  const refMuscleGroupFilterSelect = useRef<BottomSheetModal>(null);
  useState(false);
  const [filterMuscleGroups, setFilterMuscleGroups] = useState<MuscleGroup[]>(
    [],
  );
  const [deleteExerciseId, setDeleteExerciseId] = useState('');
  const [createExerciseModalActive, setCreateExerciseModalActive] =
    useState(false);
  const [allExercises, setAllExercises] = useState<ExerciseFragment[]>([]);
  const [filteredList, setFilteredList] = useState<ExerciseFragment[]>([]);
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

  const onUpdateExercise = (exercise: ExerciseFragment): void => {
    setFilteredList(
      filteredList.map(value => {
        if (value.id === exercise.id) {
          return exercise;
        }
        return value;
      }),
    );
  };

  useEffect(() => {
    if (editExercise) {
      setCreateExerciseModalActive(true);
    }
  }, [editExercise]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderLabel
          label={'Create'}
          onPress={() => setCreateExerciseModalActive(true)}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (exercisesData?.myExercises) {
      setFilteredList(exercisesData.myExercises);
      setAllExercises(exercisesData.myExercises);
    }
  }, [exercisesData?.myExercises]);

  useEffect(() => {
    if (filterMuscleGroups.length === 0) {
      setFilteredList(allExercises);
    } else {
      setFilteredList(
        [...allExercises].filter(exercise => {
          return [
            ...(exercise.primaryMuscles || []),
            ...(exercise.secondaryMuscles || []),
          ]
            .filter(nonNullable)
            .some(muscleGroup => filterMuscleGroups.includes(muscleGroup));
        }),
      );
    }
  }, [filterMuscleGroups]);

  return (
    <GradientBackground>
      {exercisesDataLoading || deleteExerciseLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredList.sort((a, b) => a.name.localeCompare(b.name))}
          ListHeaderComponent={() => {
            return (
              <View
                style={[defaultStyles.container, defaultStyles.spaceEvenly]}>
                {filteredList && (
                  <GradientButton
                    gradients={Constants.TERTIARY_GRADIENT}
                    title={'Filter'}
                    onClick={() =>
                      refMuscleGroupFilterSelect?.current?.present()
                    }
                    styles={styles.buttonWidth}
                  />
                )}
              </View>
            );
          }}
          renderItem={({item}) => {
            return (
              <ContextMenu
                key={item.id}
                actions={[
                  {title: ContextMenuActions.EDIT},
                  {title: ContextMenuActions.REMOVE, destructive: true},
                ]}
                onPress={e =>
                  e.nativeEvent.name === ContextMenuActions.EDIT
                    ? setEditExercise(item)
                    : setDeleteExerciseId(item.id)
                }
                style={defaultStyles.shadow}>
                <ExerciseProfileListItem
                  exercise={item}
                  onPress={id =>
                    props.navigation.navigate('ExerciseDetailScreen', {
                      exerciseId: id,
                    })
                  }
                />
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
        onUpdate={onUpdateExercise}
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
      <BottomSheetModalProvider>
        <CustomBottomSheet
          ref={refMuscleGroupFilterSelect}
          index={70}
          onDismissClicked={refMuscleGroupFilterSelect?.current?.dismiss}>
          <SelectMuscleGroups
            onSelected={setFilterMuscleGroups}
            preselected={filterMuscleGroups}
          />
        </CustomBottomSheet>
      </BottomSheetModalProvider>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  buttonWidth: {
    width: 200,
  },
});

export default ExercisesScreen;

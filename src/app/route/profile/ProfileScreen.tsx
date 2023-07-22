import React, {useEffect, useMemo, useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import CreateExerciseModal from '../../components/bottomSheet/CreateExerciseModal';
import {
  ExerciseFragment,
  useDeleteExerciseMutation,
  useMyExercisesQuery,
} from '../../graphql/operations';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import ExerciseProfileListItem from '../../components/exercise/ExerciseProfileListItem';
import {defaultStyles} from '../../utils/DefaultStyles';
import Constants from '../../utils/Constants';
import ClickableText from '../../components/common/ClickableText';
import ContextMenu from 'react-native-context-menu-view';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import Preferences from '../../components/profile/Preferences';
import SinglePicker from '../../components/bottomSheet/SinglePicker';

const ProfileScreen: React.FC = () => {
  const [createExerciseModalActive, setCreateExerciseModalActive] =
    useState(false);
  const [editExercise, setEditExercise] = useState<ExerciseFragment>();
  const [deleteExercise] = useDeleteExerciseMutation({fetchPolicy: 'no-cache'});
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

  const refetchData = (): void => {
    refetchExercises();
  };

  useEffect(() => {
    if (editExercise) {
      setCreateExerciseModalActive(true);
    }
  }, [editExercise]);

  return (
    <GradientBackground>
      <View style={defaultStyles.container}>
        {exercisesDataLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={exercises}
            ListHeaderComponent={
              <>
                <Preferences
                  onDefaultRepetitionClicked={() =>
                    setAdjustDefaultRepetitions(true)
                  }
                  onSetRepetitions={setRepetitions}
                  changedRepetition={nRepetitions}
                />
                <Text style={defaultStyles.h2}>Exercises</Text>
                <ClickableText
                  text={'Create exercise'}
                  onPress={() => {
                    setEditExercise(undefined);
                    setCreateExerciseModalActive(true);
                  }}
                  styles={defaultStyles.textAlignCenter}
                />
              </>
            }
            renderItem={({item}) => (
              <ContextMenu
                actions={[
                  {title: ContextMenuActions.EDIT},
                  {title: ContextMenuActions.REMOVE},
                ]}
                onPress={e =>
                  e.nativeEvent.name === ContextMenuActions.EDIT
                    ? setEditExercise(item)
                    : onDeleteExercise(item.id)
                }>
                <ExerciseProfileListItem exercise={item} />
              </ContextMenu>
            )}
          />
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
        onDismiss={() => setCreateExerciseModalActive(false)}
        existingExercise={editExercise}
        onUpdate={refetchData}
      />
    </GradientBackground>
  );
};

export default ProfileScreen;

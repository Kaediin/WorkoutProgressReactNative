import React, {useMemo} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import CreateExercise from '../../components/exercise/CreateExercise';
import {useMyExercisesQuery} from '../../graphql/operations';
import {ActivityIndicator, FlatList, StyleSheet, Text} from 'react-native';
import ExerciseProfileListItem from '../../components/exercise/ExerciseProfileListItem';

const ProfileScreen: React.FC = () => {
  const {data: exercisesData, loading: exercisesDataLoading} =
    useMyExercisesQuery({fetchPolicy: 'no-cache'});

  const exercises = useMemo(
    () => exercisesData?.myExercises,
    [exercisesData?.myExercises],
  );

  return (
    <GradientBackground>
      <Text style={styles.header}>Exercises</Text>
      {exercisesDataLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={exercises}
          renderItem={({item}) => <ExerciseProfileListItem exercise={item} />}
        />
      )}
      <CreateExercise />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    marginVertical: 20,
  },
});

export default ProfileScreen;

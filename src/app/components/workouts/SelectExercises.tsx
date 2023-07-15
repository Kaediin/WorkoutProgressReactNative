import React from 'react';
import {ExerciseFragment} from '../../graphql/operations';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

interface SelectExerciseProps {
  onSelect: (exercise: ExerciseFragment) => void;
  exercises: ExerciseFragment[];
  selectedId: string;
  onCreateExerciseClick: () => void;
}

const SelectExerciseGroups: React.FC<SelectExerciseProps> = props => {
  return (
    <ScrollView>
      <View style={styles.createNewExerciseContainer}>
        <Button
          title={'Create new exercise'}
          onPress={props.onCreateExerciseClick}
        />
      </View>
      <View style={styles.selectContainer}>
        {props.exercises.map((exercise, index) => {
          const isSelected = props.selectedId === exercise?.id;
          return (
            <LinearGradient
              colors={Constants.PRIMARY_GRADIENT}
              style={[
                styles.muscleGroupContainer,
                isSelected ? styles.selectedOpacity : {},
              ]}
              key={index}>
              <TouchableOpacity onPress={() => props.onSelect(exercise)}>
                <Text style={styles.muscleGroupText}>{exercise.name}</Text>
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  muscleGroupContainer: {
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    width: 125,
    margin: 5,
    justifyContent: 'center',
  },
  muscleGroupText: {
    paddingVertical: Constants.CONTAINER_PADDING,
    textAlign: 'center',
    color: 'white',
  },
  selectedOpacity: {
    opacity: 0.5,
  },
});

export default SelectExerciseGroups;

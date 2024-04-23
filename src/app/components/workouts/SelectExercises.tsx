import React, {useEffect, useState} from 'react';
import {ExerciseFragment} from '../../graphql/operations';
import {StyleSheet, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import {Picker} from '@react-native-picker/picker';
import AppText from '../common/AppText';
import MuscleGroupList from './MuscleGroupList';
import {nonNullable} from '../../utils/List';
import Constants from '../../utils/Constants';

interface SelectExerciseProps {
  onSelect: (exercise: ExerciseFragment) => void;
  exercises: ExerciseFragment[];
  selectedId: string;
  sort?: boolean;
  pickerItemColor?: string;
  selectionColor?: string;
}

const SelectExercises: React.FC<SelectExerciseProps> = props => {
  const [selected, setSelected] = useState<ExerciseFragment>();

  useEffect(() => {
    if (selected) {
      props.onSelect(selected);
    }
  }, [selected]);

  return (
    <View>
      <Picker
        selectedValue={props.exercises.find(it => it.id === props.selectedId)}
        onValueChange={setSelected}
        selectionColor={props.selectionColor}
        itemStyle={styles.pickerItemStyle}>
        <Picker.Item label={''} value={''} color={props.pickerItemColor} />
        {props.exercises
          .sort((a, b) => (props.sort ? a.name.localeCompare(b.name) : 0))
          .map(exercise => (
            <Picker.Item
              key={exercise.id}
              label={exercise.name}
              value={exercise}
              color={props.pickerItemColor}
            />
          ))}
      </Picker>
      {selected?.primaryMuscles && (
        <View>
          <MuscleGroupList
            muscleGroups={selected.primaryMuscles.filter(nonNullable)}
            textColor={'white'}
            pillColor={Constants.QUATERNARY_GRADIENT[1]}
            alignCenter
          />
        </View>
      )}
      {selected?.secondaryMuscles && (
        <View>
          <MuscleGroupList
            muscleGroups={selected.secondaryMuscles.filter(nonNullable)}
            textColor={'white'}
            pillColor={Constants.TERTIARY_GRADIENT[1]}
            alignCenter
          />
        </View>
      )}
      {selected?.notes && (
        <AppText
          style={[
            defaultStyles.textAlignCenter,
            defaultStyles.p11,
            defaultStyles.container,
            defaultStyles.blackTextColor,
          ]}>
          {selected.notes}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerItemStyle: {
    fontSize: 18,
  },
});

export default SelectExercises;

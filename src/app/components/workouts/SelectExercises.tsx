import React, {useEffect, useState} from 'react';
import {ExerciseFragment} from '../../graphql/operations';
import {StyleSheet, Text, View} from 'react-native';
import Constants from '../../utils/Constants';
import ClickableText from '../common/ClickableText';
import {defaultStyles} from '../../utils/DefaultStyles';
import {Picker} from '@react-native-picker/picker';

interface SelectExerciseProps {
  onSelect: (exercise: ExerciseFragment) => void;
  exercises: ExerciseFragment[];
  selectedId: string;
  onCreateExerciseClick: () => void;
  sort?: boolean;
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
      <View style={styles.textAlignRight}>
        <ClickableText
          text={'Create new exercise'}
          onPress={props.onCreateExerciseClick}
        />
      </View>
      <Picker
        selectedValue={props.exercises.find(it => it.id === props.selectedId)}
        onValueChange={setSelected}
        itemStyle={styles.pickerItemStyle}>
        <Picker.Item label={''} value={''} />
        {props.exercises
          .sort((a, b) => (props.sort ? a.name.localeCompare(b.name) : 0))
          .map(exercise => (
            <Picker.Item
              key={exercise.id}
              label={exercise.name}
              value={exercise}
            />
          ))}
      </Picker>
      {selected?.notes && (
        <Text
          style={[
            defaultStyles.textAlignCenter,
            defaultStyles.footnote,
            defaultStyles.container,
          ]}>
          {selected.notes}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textAlignRight: {
    alignItems: 'flex-end',
    marginBottom: Constants.CONTAINER_PADDING_MARGIN * 2,
  },
  pickerItemStyle: {
    fontSize: 11,
  },
});

export default SelectExercises;

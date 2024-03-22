import React, {useEffect, useState} from 'react';
import {MuscleGroup} from '../../graphql/operations';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {enumToReadableString} from '../../utils/String';
import Constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../common/AppText';

interface SelectMuscleGroupsProps {
  onSelected: (groups: MuscleGroup[]) => void;
  preselected?: MuscleGroup[];
  buttonText?: string;
}

const SelectMuscleGroups: React.FC<SelectMuscleGroupsProps> = props => {
  const [selected, setSelected] = useState<MuscleGroup[]>(
    props.preselected || [],
  );

  useEffect(() => {
    props.onSelected(selected || []);
  }, [selected]);

  return (
    <View>
      <View style={styles.selectContainer}>
        {Object.keys(MuscleGroup).map(muscleGroup => {
          const isSelected = selected.includes(muscleGroup as MuscleGroup);
          return (
            <LinearGradient
              colors={
                isSelected
                  ? Constants.SECONDARY_GRADIENT
                  : Constants.SECONDARY_GRADIENT_FADED
              }
              style={styles.muscleGroupContainer}
              key={muscleGroup}>
              <TouchableOpacity
                onPress={() => {
                  if (isSelected) {
                    setSelected([...selected].filter(it => it !== muscleGroup));
                  } else {
                    setSelected([...selected, muscleGroup as MuscleGroup]);
                  }
                }}>
                <AppText style={styles.muscleGroupText}>
                  {enumToReadableString(muscleGroup)}
                </AppText>
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  muscleGroupContainer: {
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    width: 125,
    margin: 5,
  },
  muscleGroupText: {
    paddingVertical: 20,
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    marginVertical: 50,
  },
});

export default SelectMuscleGroups;

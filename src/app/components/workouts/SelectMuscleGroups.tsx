import React, {useState} from 'react';
import {MuscleGroup} from '../../graphql/operations';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {enumToReadableString} from '../../utils/String';
import Constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../common/GradientButton';

interface SelectMuscleGroupsProps {
  onConfirm: (groups: MuscleGroup[]) => void;
  preselected?: MuscleGroup[];
}

const SelectMuscleGroups: React.FC<SelectMuscleGroupsProps> = props => {
  const [selected, setSelected] = useState<MuscleGroup[]>(
    props.preselected || [],
  );

  return (
    <View>
      <View style={styles.selectContainer}>
        {Object.keys(MuscleGroup).map((muscleGroup, index) => {
          const isSelected = selected.includes(muscleGroup as MuscleGroup);
          return (
            <LinearGradient
              colors={Constants.PRIMARY_GRADIENT}
              style={[
                styles.muscleGroupContainer,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  opacity: isSelected ? 0.5 : 1,
                },
              ]}
              key={index}>
              <TouchableOpacity
                onPress={() => {
                  if (isSelected) {
                    setSelected([...selected].filter(it => it !== muscleGroup));
                  } else {
                    setSelected([...selected, muscleGroup as MuscleGroup]);
                  }
                }}>
                <Text style={styles.muscleGroupText}>
                  {enumToReadableString(muscleGroup)}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <GradientButton
          title={'Confirm'}
          gradients={Constants.POSITIVE_GRADIENT}
          onClick={() => props.onConfirm(selected)}
        />
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
    marginTop: 100,
  },
});

export default SelectMuscleGroups;

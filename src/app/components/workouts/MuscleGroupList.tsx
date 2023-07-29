import React from 'react';
import {MuscleGroup} from '../../graphql/operations';
import {ColorValue, StyleSheet, Text, View} from 'react-native';
import {enumToReadableString} from '../../utils/String';
import Constants from '../../utils/Constants';
import {defaultStyles} from '../../utils/DefaultStyles';

interface MuscleGroupListProps {
  muscleGroups: MuscleGroup[];
  alignCenter?: boolean;
  pillColor?: ColorValue;
  textColor?: ColorValue;
}

const MuscleGroupList: React.FC<MuscleGroupListProps> = props => {
  return (
    <View
      style={[styles.muscleGroupContainer, props.alignCenter && styles.center]}>
      {props.muscleGroups.map(group => {
        return (
          <View
            key={group}
            style={[
              styles.muscleGroup,
              props.pillColor ? {backgroundColor: props.pillColor} : {},
            ]}>
            <Text
              style={[
                props.textColor ? {color: props.textColor} : {},
                defaultStyles.p11,
              ]}>
              {enumToReadableString(group)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  muscleGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  center: {
    justifyContent: 'center',
  },
  muscleGroup: {
    margin: 5,
    padding: 6,
    backgroundColor: 'white',
    borderRadius: Constants.BORDER_RADIUS_LARGE,
    width: 90,
    display: 'flex',
    alignItems: 'center',
  },
});

export default MuscleGroupList;

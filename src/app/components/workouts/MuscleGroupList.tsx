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
                defaultStyles.p11,
                // eslint-disable-next-line react-native/no-inline-styles
                {color: props.textColor ? props.textColor : 'black'},
                styles.center,
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
    textAlign: 'center',
  },
  muscleGroup: {
    margin: 5,
    padding: 6,
    backgroundColor: 'white',
    borderRadius: Constants.BORDER_RADIUS_LARGE,
    width: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MuscleGroupList;

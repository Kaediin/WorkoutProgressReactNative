import React from 'react';
import {Button} from 'react-native';

interface EndWorkoutProps {
  label: string;
  color?: string;
  onPress: () => void;
}

const EndWorkout: React.FC<EndWorkoutProps> = props => {
  return (
    <Button title={props.label} color={props.color} onPress={props.onPress} />
  );
};

export default EndWorkout;

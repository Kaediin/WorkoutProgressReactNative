import React from 'react';
import ClickableText from '../../common/ClickableText';
import {defaultStyles} from '../../../utils/DefaultStyles';

interface EndWorkoutProps {
  label: string;
  color?: string;
  onPress: () => void;
}

const HeaderLabel: React.FC<EndWorkoutProps> = props => {
  return (
    <ClickableText
      text={props.label}
      styles={{color: props.color ?? defaultStyles.clickableText.color}}
      onPress={props.onPress}
    />
  );
};

export default HeaderLabel;

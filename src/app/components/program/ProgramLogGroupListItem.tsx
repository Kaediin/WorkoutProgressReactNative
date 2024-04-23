import React from 'react';
import {View} from 'react-native';
import AppText from '../common/AppText';
import {ProgramLogGroupFragment} from '../../graphql/operations';
import {enumToReadableString} from '../../utils/String';
import {defaultStyles} from '../../utils/DefaultStyles';
import ClickableText from '../common/ClickableText';

interface ProgramLogGroupListItemProps {
  programLogGroup: ProgramLogGroupFragment;
  onCreateLogPress: () => void;
}

const ProgramLogGroupListItem: React.FC<
  ProgramLogGroupListItemProps
> = props => {
  return (
    <View style={defaultStyles.centerContent}>
      <AppText h4>{enumToReadableString(props.programLogGroup.type)}</AppText>
      <ClickableText text={'Add log'} onPress={props.onCreateLogPress} />
    </View>
  );
};

export default ProgramLogGroupListItem;

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ProgramShortFragment} from '../../graphql/operations';
import Constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../common/AppText';
import {defaultStyles} from '../../utils/DefaultStyles';
import {DATE_TIME_FORMAT} from '../../utils/Date';
import moment from 'moment/moment';

interface ProgramListItemProps {
  program: ProgramShortFragment;
  onProgramPressed: (id: string) => void;
}

const ProgramListItem: React.FC<ProgramListItemProps> = props => {
  return (
    <TouchableOpacity
      style={[styles.touchableOpacity]}
      onPress={() => props.onProgramPressed(props.program.id)}>
      <LinearGradient
        colors={Constants.SECONDARY_GRADIENT}
        style={styles.container}>
        <View>
          <AppText h4>{props.program.name}</AppText>
          <AppText xSmall>
            Created on{' '}
            {moment(props.program.createdDateTime).format(DATE_TIME_FORMAT)}
          </AppText>
          <AppText T2 style={defaultStyles.marginTop}>
            {props.program.remark}
          </AppText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  touchableOpacity: {
    margin: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL, // Needed for ContextAction Styling
  },
  container: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
});
export default ProgramListItem;

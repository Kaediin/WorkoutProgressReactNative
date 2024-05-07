import React from 'react';
import {ProgramLogFragment} from '../../graphql/operations';
import {StyleSheet, View} from 'react-native';
import AppText from '../common/AppText';
import {logValueToString} from '../../utils/String';
import Constants from '../../utils/Constants';
import {defaultStyles} from '../../utils/DefaultStyles';
import {ArrowDownRight} from '../../icons/svg';
import AppSlider from '../common/AppSlider';

interface ProgramLogListItemProps {
  log: ProgramLogFragment;
}

const ProgramLogListItem: React.FC<ProgramLogListItemProps> = ({log}) => {
  return (
    <View style={styles.container}>
      {log.subdivisions && log.subdivisions.length > 0 ? (
        <View>
          <AppText>
            {log.repetitions} x {logValueToString(log.logValue)}{' '}
            {log.cooldownSeconds
              ? "R'" + log.cooldownSeconds + 'sec'
              : log.intervalSeconds
              ? '@' + log.intervalSeconds + 'sec'
              : ''}
          </AppText>
          {log.subdivisions.map((subdivision, index, array) => (
            <View key={index}>
              <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
                <View style={[defaultStyles.rotate90, styles.marginLeft]}>
                  <ArrowDownRight />
                </View>
                <AppText>
                  {logValueToString(subdivision.logValue) + ' '}
                  {subdivision.exercise?.name}
                  {subdivision.cooldownSeconds
                    ? " R'" + subdivision.cooldownSeconds + 'sec'
                    : subdivision.intervalSeconds
                    ? ' @' + subdivision.intervalSeconds + 'sec'
                    : ''}
                </AppText>
              </View>
              {index !== array.length - 1 && (
                <View style={styles.separatorStyle}>
                  <View style={defaultStyles.separator} />
                </View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={defaultStyles.row}>
          <AppText>
            {log.repetitions} x {logValueToString(log.logValue)}{' '}
            {log.exercise?.name}{' '}
            {log.cooldownSeconds
              ? "R'" + log.cooldownSeconds + 'sec'
              : log.intervalSeconds
              ? '@' + log.intervalSeconds + 'sec'
              : ''}
          </AppText>
        </View>
      )}
      {!!log.effort && log.effort > 0 && (
        <View>
          <AppSlider value={log.effort} disabled />
          <AppText xSmall T2>
            Effort: {log.effort}%
          </AppText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.SECONDARY_GRADIENT[0],
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  separatorStyle: {
    width: 100,
    alignSelf: 'center',
    marginVertical: 5,
  },
  marginLeft: {
    marginLeft: 30,
  },
});

export default ProgramLogListItem;

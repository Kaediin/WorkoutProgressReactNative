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
          {!!log.effort && log.effort > 0 && (
            <View style={defaultStyles.marginTop}>
              <AppSlider value={log.effort} disabled />
              <AppText xSmall T2>
                Effort: {log.effort}%
              </AppText>
            </View>
          )}
          {log.subdivisions.map((subdivision, index) => (
            <View
              key={'programloglistitem' + log.id + 'index' + index}
              style={styles.subdivisionRow}>
              <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
                <View style={defaultStyles.rotate90}>
                  <ArrowDownRight />
                </View>
                <View style={defaultStyles.flex1}>
                  <AppText rightText>
                    {logValueToString(subdivision.logValue) + ' '}
                    {subdivision.exercise?.name}
                    {subdivision.cooldownSeconds
                      ? " R'" + subdivision.cooldownSeconds + 'sec'
                      : subdivision.intervalSeconds
                      ? ' @' + subdivision.intervalSeconds + 'sec'
                      : ''}
                  </AppText>
                </View>
              </View>
              {!!subdivision.effort && subdivision.effort > 0 && (
                <View style={styles.efforSubcontainer}>
                  <AppText xSmall T2 rightText>
                    Effort: {subdivision.effort}%
                  </AppText>
                  <AppSlider value={subdivision.effort} disabled />
                </View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <>
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
          {!!log.effort && log.effort > 0 && (
            <View style={defaultStyles.marginTop}>
              <AppText xSmall T2>
                Effort: {log.effort}%
              </AppText>
              <AppSlider value={log.effort} disabled />
            </View>
          )}
        </>
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
  marginLeft: {
    marginLeft: 10,
  },
  subdivisionRow: {
    padding: 10,
    backgroundColor: Constants.PRIMARY_GRADIENT[1],
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    marginTop: 10,
  },
  efforSubcontainer: {
    marginTop: 2,
  },
});

export default ProgramLogListItem;

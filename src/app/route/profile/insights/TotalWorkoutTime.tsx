import React, {useState} from 'react';
import {useCountTotalTimeWorkoutsQuery} from '../../../graphql/operations';
import {StyleSheet, View} from 'react-native';
import AppText from '../../../components/common/AppText';
import {defaultStyles} from '../../../utils/DefaultStyles';
import Constants from '../../../utils/Constants';

const TotalWorkoutTime: React.FC = () => {
  const [minutes, setMinutes] = useState<number>();
  const {} = useCountTotalTimeWorkoutsQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.countTotalTimeAllMyWorkoutsInMinutes) {
        setMinutes(data.countTotalTimeAllMyWorkoutsInMinutes);
      }
    },
  });

  return (
    <View style={styles.container}>
      <AppText
        style={[
          defaultStyles.p9,
          defaultStyles.textAlignCenter,
          defaultStyles.marginBottom,
        ]}>
        Workout time
      </AppText>
      {minutes ? (
        <AppText style={defaultStyles.textAlignCenter}>
          {Math.floor(minutes / 60)}h {minutes % 60}m
        </AppText>
      ) : (
        <AppText style={defaultStyles.textAlignCenter}>0h 0m</AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 50,
    paddingTop: Constants.CONTAINER_PADDING_MARGIN / 1.5,
    backgroundColor: Constants.TERTIARY_GRADIENT[0],
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
});

export default TotalWorkoutTime;

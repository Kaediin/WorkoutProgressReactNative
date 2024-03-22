import React, {useState} from 'react';
import {useCountWorkoutsQuery} from '../../../graphql/operations';
import AppText from '../../../components/common/AppText';
import {defaultStyles} from '../../../utils/DefaultStyles';
import {StyleSheet, View} from 'react-native';
import Constants from '../../../utils/Constants';

const TotalWorkouts: React.FC = () => {
  const [countWorkouts, setCountWorkouts] = useState<number>();

  const {} = useCountWorkoutsQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.countMyWorkouts) {
        setCountWorkouts(data.countMyWorkouts);
      }
    },
  });

  return (
    <View style={styles.container}>
      <AppText
        style={[
          defaultStyles.p11,
          defaultStyles.textAlignCenter,
          defaultStyles.marginBottom,
        ]}>
        Workouts
      </AppText>
      <AppText style={defaultStyles.textAlignCenter}>
        {countWorkouts ?? 0}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 60,
    padding: Constants.CONTAINER_PADDING_MARGIN,
    backgroundColor: Constants.TERTIARY_GRADIENT[0],
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
});
export default TotalWorkouts;

import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {ActivityStackParamList} from '../../stacks/ActivityStack';
import WorkoutOverview from './WorkoutOverview';
import {SegmentedButtons} from 'react-native-paper';
import {defaultStyles} from '../../utils/DefaultStyles';
import Constants from '../../utils/Constants';
import {StyleSheet, View} from 'react-native';
import ProgramOverview from './ProgramOverview';

type Props = NativeStackScreenProps<ActivityStackParamList, 'ActivityOverview'>;

const ActivityScreen: React.FC<Props> = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState<'Workouts' | 'Programs'>(
    'Programs',
  );

  const setNavTitle = (title: string) => {
    navigation.setOptions({
      headerTitle: title,
    });
  };

  return (
    <GradientBackground>
      <View style={styles.segmentedButtons}>
        <SegmentedButtons
          buttons={[
            {
              value: 'Workouts',
              label: 'Workouts',
              labelStyle: defaultStyles.whiteTextColor,
              style: {
                borderWidth: 0,
                backgroundColor:
                  selectedValue === 'Workouts'
                    ? Constants.PRIMARY_GRADIENT[0]
                    : Constants.SECONDARY_GRADIENT[0],
              },
            },
            {
              value: 'Programs',
              label: 'Programs',
              labelStyle: defaultStyles.whiteTextColor,
              style: {
                borderWidth: 0,
                backgroundColor:
                  selectedValue === 'Programs'
                    ? Constants.PRIMARY_GRADIENT[0]
                    : Constants.SECONDARY_GRADIENT[0],
              },
            },
          ]}
          value={selectedValue}
          onValueChange={value =>
            setSelectedValue(value as 'Workouts' | 'Programs')
          }
        />
      </View>
      {selectedValue === 'Workouts' ? (
        <WorkoutOverview
          onNavigateToWorkout={workoutId =>
            navigation.navigate('WorkoutDetail', {workoutId: workoutId})
          }
          setNavTitle={setNavTitle}
        />
      ) : (
        <ProgramOverview
          setNavTitle={setNavTitle}
          onProgramPressed={programId =>
            navigation.navigate('ProgramDetail', {programId})
          }
        />
      )}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  segmentedButtons: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20,
  },
});

export default ActivityScreen;

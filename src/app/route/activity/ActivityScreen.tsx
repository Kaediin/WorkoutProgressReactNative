import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {ActivityStackParamList} from '../../stacks/ActivityStack';
import WorkoutOverview from './WorkoutOverview';
import {StyleSheet, View} from 'react-native';
import ProgramOverview from './ProgramOverview';
import AppSegmentedButtons from '../../components/common/AppSegmentedButtons';

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
        <AppSegmentedButtons
          buttons={[
            {
              value: 'Workouts',
              label: 'Workouts',
            },
            {
              value: 'Programs',
              label: 'Programs',
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

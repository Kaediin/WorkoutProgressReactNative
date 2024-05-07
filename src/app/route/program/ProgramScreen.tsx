import React from 'react';
import {ProgramStackParamList} from '../../stacks/ProgramStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import ProgramOverview from '../activity/ProgramOverview';
import useActivityStore from '../../stores/activityStore';

type Props = NativeStackScreenProps<ProgramStackParamList, 'ProgramScreen'>;

const ProgramScreen: React.FC<Props> = ({navigation}) => {
  const setRefetchActivity = useActivityStore(
    state => state.setRefetchActivity,
  );

  const navigateToActivity = (): void => {
    // Set refetch activity to true to refetch the activity data when navigating back to the activity screen
    setRefetchActivity(true);
    // @ts-ignore
    navigation.navigate('ActivityOverview');
  };

  return (
    <GradientBackground>
      <ProgramOverview
        onProgramPressed={programId => {
          navigation.navigate('ProgramDetailScreen', {programId});
        }}
        onNavigateToActivity={navigateToActivity}
      />
    </GradientBackground>
  );
};

export default ProgramScreen;

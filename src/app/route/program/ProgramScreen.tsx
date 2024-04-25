import React from 'react';
import {ProgramStackParamList} from '../../stacks/ProgramStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import ProgramOverview from '../activity/ProgramOverview';

type Props = NativeStackScreenProps<ProgramStackParamList, 'ProgramScreen'>;

const ProgramScreen: React.FC<Props> = ({navigation}) => {
  return (
    <GradientBackground>
      <ProgramOverview
        onProgramPressed={programId => {
          navigation.navigate('ProgramDetailScreen', {programId});
        }}
      />
    </GradientBackground>
  );
};

export default ProgramScreen;

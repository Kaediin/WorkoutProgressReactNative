import React from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import AdjustPreferences from '../../components/preferences/AdjustPreferences';

const PreferencesScreen: React.FC = () => {
  return (
    <GradientBackground>
      <AdjustPreferences />
    </GradientBackground>
  );
};

export default PreferencesScreen;

import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import React from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import WorkoutStack from '../../stacks/WorkoutStack';
import ProfileStack from '../../stacks/ProfileStack';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Tab.Navigator>
        <Tab.Screen name={'Workout'} component={WorkoutStack} />
        <Tab.Screen name={'Profile'} component={ProfileStack} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default TabNavigator;

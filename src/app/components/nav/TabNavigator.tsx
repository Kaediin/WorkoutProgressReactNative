import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import React from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import WorkoutStack from '../../stacks/WorkoutStack';
import ProfileStack from '../../stacks/ProfileStack';
import {Dumbbell, Profile, Workout} from '../../icons/svg';
import {StyleSheet, View} from 'react-native';
import ExercisesStack from '../../stacks/ExercisesStack';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Tab.Navigator>
        <Tab.Screen
          name={'Workouts'}
          component={WorkoutStack}
          options={{
            tabBarIcon: () => (
              <View style={styles.marginTop}>
                <Workout />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={'Exercises'}
          component={ExercisesStack}
          options={{
            tabBarIcon: () => (
              <View style={styles.marginTop}>
                <Dumbbell />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={'Profile'}
          component={ProfileStack}
          options={{
            tabBarIcon: () => (
              <View style={styles.marginTop}>
                <Profile />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: -2,
  },
});

export default TabNavigator;

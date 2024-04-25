import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import React from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import ActivityStack from '../../stacks/ActivityStack';
import ProfileStack from '../../stacks/ProfileStack';
import {Dumbbell, Profile, Program, Workout} from '../../icons/svg';
import {StyleSheet, View} from 'react-native';
import ExercisesStack from '../../stacks/ExercisesStack';
import ProgramStack from '../../stacks/ProgramStack';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Tab.Navigator>
        <Tab.Screen
          name={'Activity'}
          component={ActivityStack}
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
          name={'Programs'}
          component={ProgramStack}
          options={{
            tabBarIcon: () => (
              <View style={styles.marginLeft}>
                <Program />
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
  marginLeft: {
    marginLeft: 5,
  },
});

export default TabNavigator;

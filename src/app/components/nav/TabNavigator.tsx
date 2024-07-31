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
import {useEnableProgramsQuery} from '../../graphql/operations';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const {data: enableProgramsData, loading: enableProgramsLoading} =
    useEnableProgramsQuery({
      fetchPolicy: 'no-cache',
    });

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {!enableProgramsLoading && (
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
          {enableProgramsData?.enablePrograms === true && (
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
          )}
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
      )}
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

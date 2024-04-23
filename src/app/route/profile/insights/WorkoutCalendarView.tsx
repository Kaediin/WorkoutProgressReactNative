import React, {useEffect, useMemo, useState} from 'react';
import {
  useWorkoutsOfMonthLazyQuery,
  WorkoutShortFragment,
} from '../../../graphql/operations';
import moment, {Moment} from 'moment/moment';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Constants from '../../../utils/Constants';
import {defaultStyles} from '../../../utils/DefaultStyles';
import Loader from '../../../components/common/Loader';
import {nonNullable} from '../../../utils/List';
import {Chevron} from '../../../icons/svg';
import AppText from '../../../components/common/AppText';
import MuscleGroupDistribution from './MuscleGroupDistribution';

interface WorkoutCalendarViewProps {
  onSelectDay: (ids: WorkoutShortFragment[]) => void;
}

const WorkoutCalendarView: React.FC<WorkoutCalendarViewProps> = props => {
  // Record for activity logged on day of the month as key
  const [workoutLoggedOnDayOfMonth, setWorkoutLoggedOnDayOfMonth] = useState<
    Record<number, string[]>
  >({});
  // Keep track of current date that is manipulated by the chevrons
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  // Workouts fetched by query (activity of current month selected)
  const [workouts, setWorkouts] = useState<(WorkoutShortFragment | null)[]>([]);

  // Fetch all activity of month
  const [fetchWorkouts, {loading}] = useWorkoutsOfMonthLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.workoutsOfCurrentMonth) {
        setWorkouts(data.workoutsOfCurrentMonth as WorkoutShortFragment[]);
      }
    },
  });

  const isToday = useMemo(
    () => moment().format('dd/MM/yyyy') === currentDate.format('dd/MM/yyyy'),
    [currentDate],
  );

  // React to date (month) changing, fetch new results
  useEffect(() => {
    if (currentDate) {
      fetchWorkouts({
        variables: {
          zonedDateTime: currentDate.toISOString(true),
        },
      });
    }
  }, [currentDate]);

  // React to query fetching new activity (if month changes)
  useEffect(() => {
    if (workouts) {
      const dataMap: Record<number, string[]> = {};
      workouts.forEach(workout => {
        if (!workout?.id) {
          return;
        }
        const dayEntry = +moment(workout?.startDateTime).format('DD');
        if (dataMap[dayEntry]) {
          dataMap[dayEntry] = [...dataMap[dayEntry], workout?.id];
        } else {
          dataMap[dayEntry] = [workout?.id];
        }
      });
      setWorkoutLoggedOnDayOfMonth(dataMap);
    }
  }, [workouts]);

  return loading ? (
    <Loader isLoading />
  ) : (
    currentDate && (
      <View>
        {/*Header*/}
        <View
          style={[
            defaultStyles.row,
            defaultStyles.spaceBetween,
            defaultStyles.marginBottom,
          ]}>
          <TouchableOpacity
            hitSlop={20}
            onPress={() =>
              setCurrentDate(date => date.clone().subtract(1, 'month'))
            }>
            <View style={styles.mirror}>
              <Chevron />
            </View>
          </TouchableOpacity>
          <AppText style={defaultStyles.h3}>
            {currentDate.format('yyyy') === moment().format('yyyy')
              ? currentDate.format('MMMM')
              : currentDate.format('MMMM yyyy')}
          </AppText>
          {isToday ? (
            <View style={styles.containerWidth} />
          ) : (
            <TouchableOpacity
              hitSlop={20}
              onPress={() =>
                setCurrentDate(date => date.clone().add(1, 'month'))
              }
              style={styles.containerWidth}>
              <Chevron />
            </TouchableOpacity>
          )}
        </View>
        {/*Calendar*/}
        <View style={styles.calendarContainer}>
          {Array.from({length: currentDate.daysInMonth()}).map((day, index) =>
            workoutLoggedOnDayOfMonth[index + 1] ? (
              <TouchableOpacity
                style={[styles.calendarDay]}
                key={index}
                onPress={() => {
                  props.onSelectDay(
                    workouts
                      .filter(nonNullable)
                      .filter(workout =>
                        workoutLoggedOnDayOfMonth[index + 1].some(
                          id => id === workout.id,
                        ),
                      ),
                  );
                }}>
                <View>
                  <AppText
                    style={[defaultStyles.p11, defaultStyles.textAlignCenter]}>
                    {index + 1}
                  </AppText>
                  {+moment().format('DD') === index + 1 && (
                    <AppText style={styles.todayBulletPoint}>&#x2022;</AppText>
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <View style={[styles.calendarDay, styles.inactive]} key={index}>
                <View>
                  <AppText
                    style={[defaultStyles.p11, defaultStyles.textAlignCenter]}>
                    {index + 1}
                  </AppText>
                  {+moment().format('DD') === index + 1 && isToday && (
                    <AppText style={styles.todayBulletPoint}>&#x2022;</AppText>
                  )}
                </View>
              </View>
            ),
          )}
        </View>
        {/*Pie chart*/}
        <MuscleGroupDistribution date={currentDate} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
    width: 40,
    height: 40,
    backgroundColor: Constants.TERTIARY_GRADIENT[0],
    marginRight: Constants.CONTAINER_PADDING_MARGIN / 2,
    marginBottom: Constants.CONTAINER_PADDING_MARGIN / 2,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactive: {
    opacity: 0.4,
  },
  mirror: {
    transform: [{rotateY: '180deg'}],
  },
  todayBulletPoint: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },
  containerWidth: {
    width: 30,
  },
});

export default WorkoutCalendarView;

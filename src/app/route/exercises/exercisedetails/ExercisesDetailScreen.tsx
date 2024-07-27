import React, {useEffect, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../../components/common/GradientBackground';
import {
  ExerciseLineChartDataFragment,
  ExerciseLogFragment,
  LogUnit,
  useAllLogsByExerciseIdLazyQuery,
  useChartDataOfXMonthsByExerciseIdLazyQuery,
} from '../../../graphql/operations';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  combineLogValueBaseFraction,
  logValueToString,
} from '../../../utils/String';
import AppText from '../../../components/common/AppText';
import moment from 'moment/moment';
import {defaultStyles} from '../../../utils/DefaultStyles';
import Constants from '../../../utils/Constants';
import {LineChart} from 'react-native-chart-kit';
import usePreferenceStore from '../../../stores/preferenceStore';
import {ExercisesStackParamList} from '../../../stacks/ExercisesStack';
import Loader from '../../../components/common/Loader';
import ContextMenu from 'react-native-context-menu-view';
import ClickableText from '../../../components/common/ClickableText';
import {SegmentedButtons} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';

type Props = NativeStackScreenProps<
  ExercisesStackParamList,
  'ExercisesDetailScreen'
>;

const ExercisesDetailScreen: React.FC<Props> = props => {
  // Get preference from store
  const preferences = usePreferenceStore(state => state.preference);

  // State for month range
  const [monthRange, setMonthRange] = useState<string>('3');

  // State for filter mode
  const [filterMode, setFilterMode] = useState<
    'ONLY_WARMUP' | 'ONLY_LOGS' | 'MIX'
  >('MIX');

  // State for logs and chart data
  const [allLogs, setAllLogs] = useState<ExerciseLogFragment[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ExerciseLogFragment[]>([]);
  const [chartData, setChartData] = useState<ExerciseLineChartDataFragment[]>(
    [],
  );

  // Fetch chart data by exercisedetails id
  const [fetchChartData, {loading: loadinChartData}] =
    useChartDataOfXMonthsByExerciseIdLazyQuery({
      onCompleted: data => {
        if (data?.chartDataOfXMonthsByExerciseId) {
          setChartData(data.chartDataOfXMonthsByExerciseId);
        }
      },
    });

  // Fetch all logs by exercisedetails id
  const [fetchAllLogs] = useAllLogsByExerciseIdLazyQuery({
    onCompleted: data => {
      if (data?.allLogsByExerciseId) {
        setAllLogs(data.allLogsByExerciseId);
      }
    },
  });

  // Fetch logs when param (exercisedetails id) changes
  useEffect(() => {
    if (props.route.params.exerciseId) {
      fetchAllLogs({
        fetchPolicy: 'no-cache',
        variables: {
          exerciseId: props.route.params.exerciseId,
        },
      });
      fetchChartData({
        fetchPolicy: 'no-cache',
        variables: {
          exerciseId: props.route.params.exerciseId,
          months: parseInt(monthRange, 10),
          zonedDateTimeString: moment().toISOString(true),
        },
      });
    }
  }, [props.route.params, monthRange]);

  // Change header when new logs are fetched
  useEffect(() => {
    if (allLogs && allLogs.length > 0) {
      props.navigation.setOptions({
        headerTitle: allLogs[0].exercise.name,
      });
    }
  }, [allLogs]);

  // Reactive var that always sorts values in reverse chronological order
  const sortedLogValues = useMemo(
    () =>
      chartData && chartData.length > 0
        ? chartData
            .flatMap(log => log.logs)
            .filter(log =>
              filterMode === 'ONLY_LOGS'
                ? log.warmup === false
                : filterMode === 'ONLY_WARMUP'
                ? log.warmup === true
                : true,
            )
            .sort(
              (a, b) =>
                new Date(a.logDateTime).getTime() -
                new Date(b.logDateTime).getTime(),
            )
            .map(log => combineLogValueBaseFraction(log.logValue))
        : [0],
    [chartData, filterMode],
  );

  useEffect(() => {
    // Adjust headerRight depending on state
    props.navigation.setOptions({
      headerRight: () => (
        <ContextMenu
          actions={[
            {
              title: 'Only Warmup',
              disabled: filterMode === 'ONLY_WARMUP',
            },
            {
              title: 'Only Logs',
              disabled: filterMode === 'ONLY_LOGS',
            },
            {
              title: 'Mix',
              disabled: filterMode === 'MIX',
            },
          ]}
          onPress={e => {
            switch (e.nativeEvent.name) {
              case 'Only Warmup':
                setFilterMode('ONLY_WARMUP');
                break;
              case 'Only Logs':
                setFilterMode('ONLY_LOGS');
                break;
              case 'Mix':
                setFilterMode('MIX');
                break;
            }
          }}
          dropdownMenuMode>
          <ClickableText
            text="Filter"
            styles={defaultStyles.p20}
            onPress={() => {}}
          />
        </ContextMenu>
      ),
    });

    // Filter logs based on selected filter mode
    if (allLogs && allLogs.length > 0) {
      setFilteredLogs(
        [...allLogs].filter(log =>
          filterMode === 'ONLY_LOGS'
            ? log.warmup === false
            : filterMode === 'ONLY_WARMUP'
            ? log.warmup === true
            : true,
        ),
      );
    }
  }, [filterMode, allLogs]);

  let currentWorkoutId = '';
  let currentColor = Constants.SECONDARY_GRADIENT[0];

  // @ts-ignore
  const renderItem = ({item}) => {
    if (item.workout.id !== currentWorkoutId) {
      currentWorkoutId = item.workout.id;
      currentColor =
        currentColor === Constants.SECONDARY_GRADIENT[0]
          ? Constants.PRIMARY_GRADIENT[0]
          : Constants.SECONDARY_GRADIENT[0];
    }

    return (
      <View style={[styles.containerLogRow, {backgroundColor: currentColor}]}>
        <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
          <AppText>
            {item.warmup && '• '}
            {logValueToString(item.logValue)} x {item.repetitions}
          </AppText>
          <AppText>
            {moment(item.logDateTime).format('MMMM DD yyyy - HH:mm:ss')}
          </AppText>
        </View>
        {item.remark && (
          <AppText style={[defaultStyles.p11, defaultStyles.marginTop]}>
            {item.remark}
          </AppText>
        )}
      </View>
    );
  };

  return (
    <GradientBackground>
      <FlashList
        estimatedItemSize={100}
        data={filteredLogs}
        contentContainerStyle={defaultStyles.padding}
        ListHeaderComponent={
          loadinChartData ? (
            <Loader isLoading style={defaultStyles.container} />
          ) : (
            <View style={[defaultStyles.marginBottom, styles.containerChart]}>
              <SegmentedButtons
                buttons={[
                  {
                    value: '3',
                    label: '3 Months',
                    labelStyle: defaultStyles.whiteTextColor,
                    style: {
                      backgroundColor:
                        monthRange === '3'
                          ? Constants.PRIMARY_GRADIENT[0]
                          : Constants.SECONDARY_GRADIENT[0],
                    },
                  },
                  {
                    value: '6',
                    label: '6 Months',
                    labelStyle: defaultStyles.whiteTextColor,
                    style: {
                      backgroundColor:
                        monthRange === '6'
                          ? Constants.PRIMARY_GRADIENT[0]
                          : Constants.SECONDARY_GRADIENT[0],
                    },
                  },
                  {
                    value: '12',
                    label: '12 Months',
                    labelStyle: defaultStyles.whiteTextColor,
                    style: {
                      backgroundColor:
                        monthRange === '12'
                          ? Constants.PRIMARY_GRADIENT[0]
                          : Constants.SECONDARY_GRADIENT[0],
                    },
                  },
                ]}
                value={monthRange}
                onValueChange={setMonthRange}
                style={styles.segmentedButtons}
                theme={{colors: {primary: Constants.PRIMARY_GRADIENT[0]}}}
              />
              <LineChart
                data={{
                  labels: [],
                  datasets: [
                    {
                      data: sortedLogValues,
                    },
                  ],
                }}
                yAxisSuffix={preferences?.weightUnit || LogUnit.KG}
                width={
                  Dimensions.get('window').width -
                  Constants.CONTAINER_PADDING_MARGIN * 2
                }
                height={280}
                chartConfig={{
                  backgroundGradientFrom: Constants.SECONDARY_GRADIENT[0],
                  backgroundGradientTo: Constants.SECONDARY_GRADIENT[0],
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  propsForDots: {
                    r: '3',
                    strokeWidth: '1',
                    stroke: Constants.PRIMARY_GRADIENT[1],
                  },
                }}
                fromZero
                bezier
              />
              <View>
                <View style={styles.footerChart}>
                  <AppText
                    style={[
                      defaultStyles.footnote,
                      defaultStyles.textAlignCenter,
                    ]}>
                    Logs plotted of past {monthRange} months
                  </AppText>
                </View>
              </View>
            </View>
          )
        }
        stickyHeaderIndices={[0]}
        renderItem={renderItem}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  flatlistHeight: {
    height: '100%',
  },
  containerLogRow: {
    backgroundColor: Constants.SECONDARY_GRADIENT[0],
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    marginBottom: Constants.CONTAINER_PADDING_MARGIN,
  },
  containerChart: {
    backgroundColor: Constants.SECONDARY_GRADIENT[0],
    paddingTop: Constants.CONTAINER_PADDING_MARGIN * 2,
    paddingBottom: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  footerChart: {
    marginTop: -20,
  },
  segmentedButtons: {
    paddingHorizontal: Constants.CONTAINER_PADDING_MARGIN * 2,
    paddingVertical: Constants.CONTAINER_PADDING_MARGIN,
  },
});

export default ExercisesDetailScreen;

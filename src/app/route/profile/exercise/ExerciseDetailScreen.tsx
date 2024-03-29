import React, {useEffect, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../../stacks/ProfileStack';
import GradientBackground from '../../../components/common/GradientBackground';
import {
  ExerciseLineChartDataFragment,
  ExerciseLogFragment,
  LogUnit,
  useAllLogsByExerciseIdLazyQuery,
  useChartDataOfXMonthsByExerciseIdLazyQuery,
} from '../../../graphql/operations';
import Loader from '../../../components/common/Loader';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {
  combineLogValueBaseFraction,
  logValueToString,
} from '../../../utils/String';
import AppText from '../../../components/common/AppText';
import moment from 'moment/moment';
import {defaultStyles} from '../../../utils/DefaultStyles';
import Constants from '../../../utils/Constants';
import {LineChart} from 'react-native-chart-kit';
import HeaderLabel from '../../../components/nav/headerComponents/HeaderLabel';
import usePreferenceStore from '../../../stores/preferenceStore';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  'ExerciseDetailScreen'
>;

const ExerciseDetailScreen: React.FC<Props> = props => {
  const preferences = usePreferenceStore(state => state.preference);
  const [ignoreWarmup, setIgnoreWarmup] = useState(false);
  const [allLogs, setAllLogs] = useState<ExerciseLogFragment[]>([]);
  const [chartData, setChartData] = useState<ExerciseLineChartDataFragment[]>(
    [],
  );

  // Fetch chart data by exercise id
  const [fetchChartData, {loading: loadinChartData}] =
    useChartDataOfXMonthsByExerciseIdLazyQuery({
      onCompleted: data => {
        if (data?.chartDataOfXMonthsByExerciseId) {
          setChartData(data.chartDataOfXMonthsByExerciseId);
        }
      },
    });

  // Fetch all logs by exercise id
  const [fetchAllLogs, {loading: loadingAllLogs}] =
    useAllLogsByExerciseIdLazyQuery({
      onCompleted: data => {
        if (data?.allLogsByExerciseId) {
          setAllLogs(data.allLogsByExerciseId);
        }
      },
    });

  // Fetch logs when param (exercise id) changes
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
          months: 6,
          zonedDateTimeString: moment().toISOString(true),
        },
      });
    }
  }, [props.route.params]);

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
            .filter(log => (ignoreWarmup ? log.warmup === false : true))
            .sort(
              (a, b) =>
                new Date(a.logDateTime).getTime() -
                new Date(b.logDateTime).getTime(),
            )
            .map(log => combineLogValueBaseFraction(log.logValue))
        : [0],
    [chartData, ignoreWarmup],
  );

  // Adjust headerRight depending on state
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderLabel
          label={ignoreWarmup ? 'Show warmup' : 'Ignore warmup'}
          onPress={() => setIgnoreWarmup(!ignoreWarmup)}
        />
      ),
    });
  }, [ignoreWarmup]);

  const loading = loadingAllLogs || loadinChartData;

  return (
    <GradientBackground>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <View style={defaultStyles.container}>
          <FlatList
            data={allLogs.filter(log =>
              ignoreWarmup ? log.warmup === false : true,
            )}
            style={styles.flatlistHeight}
            ListHeaderComponent={
              <View style={[defaultStyles.marginBottom, styles.containerChart]}>
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
                      r: '6',
                      strokeWidth: '2',
                      stroke: Constants.PRIMARY_GRADIENT[1],
                    },
                  }}
                  bezier
                />
                <View>
                  <View style={styles.footerChart}>
                    <AppText
                      style={[
                        defaultStyles.footnote,
                        defaultStyles.textAlignCenter,
                      ]}>
                      Logs plotted of past 6 months
                    </AppText>
                  </View>
                </View>
              </View>
            }
            stickyHeaderIndices={[0]}
            renderItem={item => {
              return (
                <View style={styles.containerLogRow}>
                  <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
                    <AppText>
                      {item.item.warmup && '• '}
                      {logValueToString(item.item.logValue)} x{' '}
                      {item.item.repetitions}
                    </AppText>
                    <AppText>
                      {moment(item.item.logDateTime).format(
                        'MMMM DD yyyy - HH:mm:ss',
                      )}
                    </AppText>
                  </View>
                  {item.item.remark && (
                    <AppText
                      style={[defaultStyles.p11, defaultStyles.marginTop]}>
                      {item.item.remark}
                    </AppText>
                  )}
                </View>
              );
            }}
          />
        </View>
      )}
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
});

export default ExerciseDetailScreen;

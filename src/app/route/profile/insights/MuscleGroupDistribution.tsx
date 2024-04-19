import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../../../components/common/AppText';
import PieChart from 'react-native-pie-chart';
import {
  MuscleGroupChartDataFragment,
  useChartDataMuscleGroupsLazyQuery,
} from '../../../graphql/operations';
import {enumToReadableString} from '../../../utils/String';
import {defaultStyles} from '../../../utils/DefaultStyles';
import Constants from '../../../utils/Constants';
import {Moment} from 'moment/moment';

interface MuscleGroupDistributionProps {
  date: Moment;
}

const MuscleGroupDistribution: React.FC<
  MuscleGroupDistributionProps
> = props => {
  const [chartData, setChartData] = useState<MuscleGroupChartDataFragment[]>(
    [],
  );

  const totalChartDataCount: number = useMemo(() => {
    return chartData && chartData.length > 0
      ? chartData.reduce(function (a, b) {
          return a + b.count;
        }, 0)
      : 0;
  }, [chartData]);

  const [fetchChartData] = useChartDataMuscleGroupsLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.chartDataMuscleGroups) {
        setChartData(data.chartDataMuscleGroups);
      }
    },
  });

  useEffect(() => {
    if (props.date) {
      fetchChartData({
        variables: {
          zonedDateTime: props.date.toISOString(true),
        },
      });
    }
  }, [props.date]);

  const widthAndHeight = 250;

  return chartData && chartData.length > 0 ? (
    <View style={styles.container}>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={chartData.map(data => data.count)}
        sliceColor={chartData.map(data => data.color)}
      />
      <View style={styles.legend}>
        {chartData.map(data => (
          <View
            style={[defaultStyles.row, styles.legendEntry]}
            key={data.muscleGroup}>
            <View
              style={[styles.legendEntryColor, {backgroundColor: data.color}]}
            />
            <AppText>
              {enumToReadableString(data.muscleGroup)} (
              {Math.round((100 / totalChartDataCount) * data.count)}%)
            </AppText>
          </View>
        ))}
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.CONTAINER_PADDING_MARGIN * 2,
    alignItems: 'center',
  },
  legend: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: Constants.CONTAINER_PADDING_MARGIN * 2,
  },
  legendEntry: {
    width: '50%',
  },
  legendEntryColor: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
});

export default MuscleGroupDistribution;

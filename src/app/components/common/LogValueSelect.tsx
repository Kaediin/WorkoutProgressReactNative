import React, {useEffect, useState} from 'react';
import {LogUnit, LogValueFragment} from '../../graphql/operations';
import usePreferenceStore from '../../stores/preferenceStore';
import {StyleSheet, Text, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import {Picker} from '@react-native-picker/picker';
import Constants from '../../utils/Constants';

interface WeightSelectProps {
  logValue?: LogValueFragment;
  onWeightSelected: (weight: LogValueFragment) => void;
  hideLabel?: boolean;
}

const LogValueSelect: React.FC<WeightSelectProps> = ({
  logValue,
  onWeightSelected,
  hideLabel,
}) => {
  const preferenceWeightUnit = usePreferenceStore(
    state => state.preference,
  )?.weightUnit;
  const preferenceDistanceUnit = usePreferenceStore(
    state => state.preference,
  )?.distanceUnit;
  const hideUnitSelector = usePreferenceStore(
    state => state.preference,
  )?.hideUnitSelector;
  const [base, setBase] = useState<number>(logValue?.base ?? 0);
  const [fraction, setFraction] = useState<number>(
    logValue?.fraction ? parseFloat(`0.${logValue.fraction}`) : 0,
  );
  const [unit, setUnit] = useState<LogUnit>(
    logValue?.unit || preferenceWeightUnit || LogUnit.KG,
  );

  useEffect(() => {
    if (base !== undefined && base !== null) {
      const nWeight: LogValueFragment = {
        base,
        fraction: fraction ? parseFloat(fraction.toString().split('.')[1]) : 0,
        unit,
      };
      onWeightSelected(nWeight);
    }
  }, [base, fraction, unit]);

  return (
    <>
      <View style={styles.pickerContainer}>
        <View style={styles.repetition}>
          <Text style={[defaultStyles.footnote, styles.pickerLabel]}>
            Value
          </Text>
          <Picker
            selectedValue={+base}
            onValueChange={setBase}
            itemStyle={styles.fontSizeSmall}>
            {Constants.WEIGHT_POINTS.map(weightPoint => (
              <Picker.Item
                label={weightPoint}
                value={+weightPoint}
                key={`weight_${weightPoint}`}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.repetition}>
          <Text style={[defaultStyles.footnote, styles.pickerLabel]}>
            Fraction
          </Text>
          <Picker
            selectedValue={+fraction}
            onValueChange={setFraction}
            itemStyle={styles.fontSizeSmall}>
            {Constants.WEIGHT_FRACTION_POINTS.map(weightFraction => (
              <Picker.Item
                label={weightFraction.toString()}
                value={+weightFraction}
                key={`fraction_${weightFraction}`}
              />
            ))}
          </Picker>
        </View>
        {!hideUnitSelector && (
          <View style={styles.repetition}>
            <Text style={[defaultStyles.footnote, styles.pickerLabel]}>
              Unit
            </Text>
            <Picker
              selectedValue={unit}
              onValueChange={setUnit}
              itemStyle={styles.fontSizeSmall}>
              {[
                preferenceWeightUnit || LogUnit.KG,
                preferenceDistanceUnit || LogUnit.KM,
              ].map(logUnit => (
                <Picker.Item
                  label={logUnit}
                  value={logUnit}
                  key={`unit_${logUnit}`}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>
      {!hideLabel && (
        <Text style={styles.selectedWeightLabel}>
          {base}
          {fraction} {unit}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  repetition: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  selectedWeightLabel: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Constants.CONTAINER_PADDING_MARGIN,
  },
  pickerLabel: {
    textAlign: 'center',
  },
  fontSizeSmall: {
    fontSize: 14,
  },
});

export default LogValueSelect;

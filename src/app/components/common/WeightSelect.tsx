import React, {useEffect, useMemo, useState} from 'react';
import {WeightUnit, WeightValueFragment} from '../../graphql/operations';
import usePreferenceStore from '../../stores/preferenceStore';
import {StyleSheet, Text, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import {Picker} from '@react-native-picker/picker';
import Constants from '../../utils/Constants';

interface WeightSelectProps {
  weightValue?: WeightValueFragment;
  onWeightSelected: (weight: WeightValueFragment) => void;
  hideLabel?: boolean;
}

const WeightSelect: React.FC<WeightSelectProps> = ({
  weightValue,
  onWeightSelected,
  hideLabel,
}) => {
  const preferenceUnit = usePreferenceStore(state => state.preference)?.unit;
  const hideUnitSelector = usePreferenceStore(
    state => state.preference,
  )?.hideUnitSelector;
  const [baseWeight, setBaseWeight] = useState<number>(
    weightValue?.baseWeight ?? 0,
  );
  const [fraction, setFraction] = useState<number>(
    weightValue?.fraction ? parseFloat(`0.${weightValue.fraction}`) : 0,
  );
  const [unit, setUnit] = useState<WeightUnit>(
    weightValue?.unit || preferenceUnit || WeightUnit.KG,
  );

  const weight = useMemo(
    () =>
      parseFloat(
        `${baseWeight}.${fraction ? fraction.toString().split('.')[1] : '0'}`,
      ),
    [baseWeight, fraction],
  );

  useEffect(() => {
    if (baseWeight !== undefined && baseWeight !== null) {
      onWeightSelected({
        baseWeight,
        fraction: fraction ? parseFloat(fraction.toString().split('.')[1]) : 0,
        unit,
      });
    }
  }, [baseWeight, fraction]);

  return (
    <>
      <View style={styles.pickerContainer}>
        <View style={styles.repetition}>
          <Text style={[defaultStyles.footnote, styles.pickerLabel]}>
            Weight
          </Text>
          <Picker
            selectedValue={baseWeight}
            onValueChange={setBaseWeight}
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
              {Object.keys(WeightUnit).map(weightUnit => (
                <Picker.Item
                  label={weightUnit}
                  value={weightUnit}
                  key={`unit_${weightUnit}`}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>
      {!hideLabel && (
        <Text style={styles.selectedWeightLabel}>
          {weight} {unit}
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

export default WeightSelect;

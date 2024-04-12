import React, {useEffect, useState} from 'react';
import {ProfileStackParamList} from '../../../stacks/ProfileStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../../components/common/GradientBackground';
import {defaultStyles} from '../../../utils/DefaultStyles';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import useUserStore from '../../../stores/userStore';
import SettingsRowEditable from '../../../components/common/SettingsRowEditable';
import {
  BiometricsType,
  LogUnit,
  useLogBiometricMutation,
} from '../../../graphql/operations';
import moment from 'moment/moment';
import ClickableText from '../../../components/common/ClickableText';
import AppText from '../../../components/common/AppText';
import usePreferenceStore from '../../../stores/preferenceStore';
import useAppleHealthKit from '../../../hooks/useAppleHealthKit';
import Loader from '../../../components/common/Loader';

type Props = NativeStackScreenProps<ProfileStackParamList, 'BiometricsScreen'>;

const BiometricsScreen: React.FC<Props> = props => {
  const preference = usePreferenceStore(state => state.preference);
  const me = useUserStore(state => state.me);
  const setMe = useUserStore(state => state.setMe);

  const {saveWeight} = useAppleHealthKit();

  const [logWeight, {loading: logWeightLoading}] = useLogBiometricMutation({
    onCompleted: data => {
      if (data?.logBiometrics) {
        setMe(data.logBiometrics);
        if (Platform.OS === 'ios' && data.logBiometrics.weight) {
          saveWeight(
            data.logBiometrics.weight.value,
            preference?.weightUnit ?? LogUnit.KG,
          );
        }
        props.navigation.goBack();
      }
    },
  });

  const [weight, setWeight] = useState(me?.weight?.value);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <ClickableText
          text={'Save'}
          onPress={() => {
            if (!weight) {
              return;
            }
            logWeight({
              fetchPolicy: 'no-cache',
              variables: {
                input: {
                  type: BiometricsType.WEIGHT,
                  value: weight,
                  unit: preference?.weightUnit ?? LogUnit.KG,
                  logDate: moment().toISOString(true),
                },
              },
            });
          }}
          disabled={
            !weight ||
            weight === me?.weight?.value ||
            weight < 1 ||
            logWeightLoading
          }
        />
      ),
    });
  }, [me, weight]);

  return (
    <GradientBackground>
      <ScrollView style={[defaultStyles.container, styles.container]}>
        <View style={[defaultStyles.row, styles.row]}>
          {logWeightLoading ? (
            <Loader isLoading />
          ) : (
            <>
              <SettingsRowEditable
                label={'Weight'}
                value={weight}
                inputType={'number'}
                onValueChange={value => setWeight(value as number)}
              />
              {weight && (
                <AppText>{preference?.weightUnit || LogUnit.KG}</AppText>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  row: {
    paddingRight: 20,
  },
  containerIcon: {
    width: 30,
  },
});

export default BiometricsScreen;

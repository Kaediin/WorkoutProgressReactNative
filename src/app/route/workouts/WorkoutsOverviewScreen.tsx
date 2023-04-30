import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../AppRoute';
import GradientBackground from '../../components/GradientBackground';
import GradientButton from '../../components/GradientButton';
import useAuth from '../../hooks/useAuth';
import {StyleSheet, View} from 'react-native';
import Constants from '../../utils/Constants';
import {useWorkoutsQuery} from '../../graphql/operations';

type Props = NativeStackScreenProps<MainStackParamList, 'WorkoutsOverview'>;

const WorkoutsOverviewScreen: React.FC<Props> = () => {
  const {signOut} = useAuth();

  const {error} = useWorkoutsQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <GradientBackground>
      <View>
        {/*<View></View>*/}
        <View style={styles.container}>
          <GradientButton
            gradients={Constants.ERROR_GRADIENT}
            title={'Signout'}
            onClick={signOut}
          />
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // bottom: 0,
    // paddingHorizontal: 20,
    // width: '100%',
  },
});

export default WorkoutsOverviewScreen;

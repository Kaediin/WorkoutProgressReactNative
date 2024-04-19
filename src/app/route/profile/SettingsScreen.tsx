import React from 'react';
import {ProfileStackParamList} from '../../stacks/ProfileStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Apple,
  Chevron,
  Preferences,
  ProfileWhite,
  Scale,
} from '../../icons/svg';
import AppText from '../../components/common/AppText';
import useUserStore from '../../stores/userStore';
import {defaultStyles} from '../../utils/DefaultStyles';
import useAuth from '../../hooks/useAuth';

type Props = NativeStackScreenProps<ProfileStackParamList, 'SettingsScreen'>;
const SettingsScreen: React.FC<Props> = props => {
  const {signOut} = useAuth();
  const me = useUserStore(state => state.me);
  const rowStyles = [defaultStyles.row, styles.row, defaultStyles.spaceBetween];

  return (
    <GradientBackground>
      <View style={[defaultStyles.container, styles.container]}>
        {/*Account*/}
        <TouchableOpacity
          style={rowStyles}
          onPress={() => props.navigation.navigate('UserSettingsScreen')}>
          <View style={defaultStyles.row}>
            <View style={styles.containerIcon}>
              <ProfileWhite />
            </View>
            <View style={defaultStyles.marginHorizontal}>
              <AppText>{me?.cognitoUser.name}</AppText>
            </View>
          </View>
          <Chevron />
        </TouchableOpacity>
        {/*Biometrics*/}
        <TouchableOpacity
          style={rowStyles}
          onPress={() => props.navigation.navigate('BiometricsScreen')}>
          <View style={defaultStyles.row}>
            <View style={styles.containerIcon}>
              <Scale />
            </View>
            <View style={defaultStyles.marginHorizontal}>
              <AppText>Biometrics</AppText>
            </View>
          </View>
          <Chevron />
        </TouchableOpacity>
        {/*Preferences*/}
        <TouchableOpacity
          style={rowStyles}
          onPress={() => props.navigation.navigate('PreferencesScreen')}>
          <View style={defaultStyles.row}>
            <View style={styles.containerIcon}>
              <Preferences />
            </View>
            <View style={defaultStyles.marginHorizontal}>
              <AppText>Preferences</AppText>
            </View>
          </View>
          <Chevron />
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={rowStyles}
            onPress={() =>
              props.navigation.navigate('AppleHealthConfigScreen')
            }>
            <View style={defaultStyles.row}>
              <View style={styles.containerIcon}>
                <Apple />
              </View>
              <View style={defaultStyles.marginHorizontal}>
                <AppText>Apple Health</AppText>
              </View>
            </View>
            <Chevron />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[rowStyles, defaultStyles.marginTop]}
          onPress={signOut}>
          <View style={defaultStyles.row}>
            <AppText style={styles.colorRed}>Sign out</AppText>
          </View>
        </TouchableOpacity>
        <View>
          <AppText xSmall T2>
            Release version {require('../../../../package.json').version}
          </AppText>
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  row: {
    marginBottom: 20,
  },
  containerIcon: {
    width: 30,
  },
  colorRed: {
    color: 'red',
  },
});

export default SettingsScreen;

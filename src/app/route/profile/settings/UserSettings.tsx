import React, {useEffect, useMemo, useState} from 'react';
import GradientBackground from '../../../components/common/GradientBackground';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ProfileStackParamList} from '../../../stacks/ProfileStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {defaultStyles} from '../../../utils/DefaultStyles';
import SettingsRowEditable from '../../../components/common/SettingsRowEditable';
import useUserStore from '../../../stores/userStore';
import HeaderLabel from '../../../components/nav/headerComponents/HeaderLabel';
import useAuth from '../../../hooks/useAuth';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  'UserSettingsScreen'
>;
const UserSettingsScreen: React.FC<Props> = props => {
  const me = useUserStore(state => state.me);
  const {updateUserAttributes} = useAuth();

  const [firstName, setFirstName] = useState(me?.cognitoUser.given_name ?? '');
  const [middleName, setMiddleName] = useState(
    me?.cognitoUser.middle_name ?? '',
  );
  const [lastName, setLastName] = useState(me?.cognitoUser.family_name ?? '');
  const [gender, setGender] = useState(me?.cognitoUser.gender ?? '');
  const data = useMemo(() => {
    return {
      given_name: firstName.trim(),
      middle_name: middleName.trim() || ' ',
      family_name: lastName.trim(),
      name: middleName.trim()
        ? `${firstName.trim()} ${middleName.trim()} ${lastName.trim()}`
        : `${firstName.trim()} ${lastName.trim()}`,
    };
  }, [firstName, middleName, lastName]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderLabel
          label={'Save'}
          onPress={() => updateUserAttributes(data)}
        />
      ),
    });
  }, [data]);

  return (
    <GradientBackground>
      <ScrollView>
        <View style={defaultStyles.container}>
          <SettingsRowEditable
            label={'First name'}
            value={firstName}
            style={styles.row}
            onValueChange={setFirstName}
          />
          <View style={defaultStyles.separator} />
          <SettingsRowEditable
            label={'Middle name'}
            value={middleName}
            style={styles.row}
            onValueChange={setMiddleName}
          />
          <View style={defaultStyles.separator} />
          <SettingsRowEditable
            label={'Last name'}
            value={lastName}
            style={styles.row}
            onValueChange={setLastName}
          />
          <View style={defaultStyles.separator} />
          <SettingsRowEditable
            label={'Gender'}
            description={'Used for calorie calculations'}
            value={gender}
            style={styles.row}
            onValueChange={setGender}
            inputType={'gender'}
          />
          <View style={defaultStyles.separator} />
          <SettingsRowEditable
            label={'Email'}
            value={me?.cognitoUser.email ?? ''}
            style={styles.row}
            disabled
          />
          <View style={defaultStyles.separator} />
          <SettingsRowEditable
            label={'Created at'}
            value={me?.cognitoUser.createdDate ?? ''}
            style={styles.row}
            disabled
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
const styles = StyleSheet.create({
  row: {
    marginVertical: 10,
    padding: 10,
  },
});
export default UserSettingsScreen;

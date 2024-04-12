import React, {useEffect, useMemo, useState} from 'react';
import GradientBackground from '../../../components/common/GradientBackground';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ProfileStackParamList} from '../../../stacks/ProfileStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {defaultStyles} from '../../../utils/DefaultStyles';
import SettingsRowEditable from '../../../components/common/SettingsRowEditable';
import useUserStore from '../../../stores/userStore';
import useAuth from '../../../hooks/useAuth';
import {upperCaseFirstLetter} from '../../../utils/String';
import ClickableText from '../../../components/common/ClickableText';
import {Delete} from '../../../icons/svg';
import Constants from '../../../utils/Constants';
import ConfirmModal from '../../../components/common/ConfirmModal';
import AppText from '../../../components/common/AppText';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  'UserSettingsScreen'
>;
const UserSettingsScreen: React.FC<Props> = props => {
  const me = useUserStore(state => state.me);
  const {deleteUser} = useAuth();
  const {updateUserAttributes} = useAuth();

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
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
      gender: upperCaseFirstLetter(gender),
    };
  }, [firstName, middleName, lastName, gender]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <ClickableText
          text={'Save'}
          styles={defaultStyles.p20}
          onPress={() => updateUserAttributes(data)}
          // Disable if nothing has changed
          disabled={
            firstName === me?.cognitoUser.given_name &&
            middleName === me?.cognitoUser.middle_name &&
            lastName === me?.cognitoUser.family_name &&
            gender === me?.cognitoUser.gender
          }
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
            onValueChange={value => setFirstName(value as string)}
          />
          <View style={defaultStyles.separator} />
          <SettingsRowEditable
            label={'Middle name'}
            value={middleName}
            style={styles.row}
            onValueChange={value => setMiddleName(value as string)}
          />
          <View style={defaultStyles.separator} />
          <SettingsRowEditable
            label={'Last name'}
            value={lastName}
            style={styles.row}
            onValueChange={value => setLastName(value as string)}
          />
          <View style={defaultStyles.separator} />
          <SettingsRowEditable
            label={'Gender'}
            description={'Used for calorie calculations'}
            value={gender}
            style={styles.row}
            onValueChange={value => setGender(value as string)}
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
          <View style={defaultStyles.separator} />
          <View style={defaultStyles.marginTop}>
            <AppText T2 xSmall>
              Click the button below will permanently delete your account and
              remove its data. This action cannot be undone.
            </AppText>
          </View>
          <TouchableOpacity
            style={styles.deleteRow}
            onPress={() => setShowDeleteAccountModal(true)}>
            <ClickableText
              styles={styles.deleteRowText}
              text={'Permanently delete account'}
              onPress={() => setShowDeleteAccountModal(true)}
            />
            <Delete />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ConfirmModal
        message={
          'Are you sure you want to permanently delete your account? This action cannot be reversed and your account along with its data will be erased forever'
        }
        isOpen={showDeleteAccountModal}
        type={'WARNING'}
        onDismiss={() => setShowDeleteAccountModal(false)}
        onConfirm={() => {
          const response = deleteUser();
          console.log(response);
        }}
        overrideConfirmGradient={Constants.ERROR_GRADIENT}
      />
    </GradientBackground>
  );
};
const styles = StyleSheet.create({
  row: {
    marginVertical: 10,
    padding: 10,
  },
  deleteRowText: {
    color: Constants.ERROR_GRADIENT[0],
  },
  deleteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderColor: Constants.ERROR_GRADIENT[1],
    borderWidth: 1,
    marginTop: Constants.CONTAINER_PADDING_MARGIN,
  },
});
export default UserSettingsScreen;

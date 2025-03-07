import {View, Text} from 'react-native';
import React from 'react';
import {PasswordUpdateNavigationProp} from '../../types/types';
import CustomText from '../../components/customText/CustomText';
import CustomInput from '../../components/input/customInput';
import COLOR from '../../constant/constant';
import CustomButton from '../../components/customButton/CustomButton';
import {usePasswordUpdate} from '../../hooks/usePasswordUpdate';
import styles from './style';
type PasswordUpdateScreenProps = {
  navigation: PasswordUpdateNavigationProp;
};

const PasswordUpdateScreen: React.FC<PasswordUpdateScreenProps> = ({
  navigation,
}) => {
  const {state, setState, handleUpdateProfile} = usePasswordUpdate(navigation);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <CustomText title="Update Password" style={styles.title} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Password</Text>
          <CustomInput
            type="password"
            placeholder="Enter current password"
            value={state.oldPassword}
            onChange={value =>
              setState(prev => ({...prev, oldPassword: value}))
            }
            secureTextEntry
          />
        </View>
        <View>
          <Text style={styles.label}>New Password</Text>
          <CustomInput
            type="password"
            placeholder="Enter new password"
            value={state.newPassword}
            onChange={value =>
              setState(prev => ({...prev, newPassword: value}))
            }
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer1}>
          <Text style={styles.label}>Confirm New Password</Text>
          <CustomInput
            type="password"
            placeholder="Confirm new password"
            value={state.confirmNewPassword}
            onChange={value =>
              setState(prev => ({...prev, confirmNewPassword: value}))
            }
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          onClick={handleUpdateProfile}
          title={state.isLoading ? 'Updating...' : 'Update Password'}
          backgroundColor={COLOR.primary}
          textColor={COLOR.white}
          width="100%"
        />
      </View>
    </View>
  );
};

export default PasswordUpdateScreen;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface AppButtonProps {
  title: string;
  onClick: () => void;
}

const AppButton: React.FC<AppButtonProps> = props => {
  return (
    <View style={styles.buttonStyles}>
      <Text style={styles.textStyles} onPress={props.onClick}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: '#1b2f31',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 200,
    fontWeight: '600',
  },
  textStyles: {
    color: '#1cc49d',
    fontSize: 20,
  },
});

export default AppButton;

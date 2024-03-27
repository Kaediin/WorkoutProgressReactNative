import React from 'react';
import {TextInputProps} from 'react-native/Libraries/Components/TextInput/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import Constants from '../../utils/Constants';

type GradientTextInputProps = TextInputProps & {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  gradient?: string[];
  borderRadius?: number;
};

const GradientTextInput: React.FC<GradientTextInputProps> = props => {
  return (
    <LinearGradient
      style={{borderRadius: props.borderRadius || 0}}
      colors={props.gradient || Constants.SECONDARY_GRADIENT}>
      <KeyboardAvoidingView>
        <TextInput
          style={[{borderRadius: props.borderRadius || 0}, props.style]}
          onChangeText={props.onChangeText}
          defaultValue={props.value}
          placeholder={props.placeholder}
          textContentType={props.textContentType}
          autoComplete={props.autoComplete}
          placeholderTextColor={props.placeholderTextColor}
          keyboardType={props.keyboardType}
          inputMode={props.inputMode}
          maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
        />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default GradientTextInput;

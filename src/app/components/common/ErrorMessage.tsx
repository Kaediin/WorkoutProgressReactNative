import React from "react";
import { StyleSheet, View } from "react-native";
import ClickableText from "./ClickableText";
import { defaultStyles } from "../../utils/DefaultStyles";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <View style={defaultStyles.container}>
      <AppText style={styles.errorMessage}>{message}</AppText>
      {onRetry && (
        <ClickableText text={"Click here to retry"} onPress={onRetry} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    textDecorationLine: "underline"
  }
});

export default ErrorMessage;

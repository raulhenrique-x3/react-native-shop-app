import { StyleSheet, Text, SafeAreaView, TextInput } from "react-native";
import { IProps } from "../interface/interface";

export const UserInput = ({ textInput1, value, onChangeText, secureTextEntry }: IProps) => {
  return (
    <SafeAreaView>
      <Text style={styles.formText}>{textInput1}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formText: {
    fontSize: 18,
    marginBottom: 4,
  },

  input: {
    width: 200,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 12,
    backgroundColor: "#fff",
    borderColor: "#cdcdcd",
    marginBottom: 12,
  },
});

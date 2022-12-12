import { Button } from "@rneui/themed";
import axios from "axios";
import { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { UserInput } from "../components/UserInput";
import FlashMessage, { showMessage } from "react-native-flash-message";

export const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  async function userRegister() {
    await axios
      .post(" http://192.168.56.1:5000/users/", {
        nome: registerName,
        email: registerEmail,
        senha: registerPassword,
      })
      .then((res) => {
        console.log(res.data);
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setShowAlert(true);
        showMessage({ message: "Sucesso!" });
      })
      .catch((err) => {
        console.error(err);
        showMessage({ message: "Erro!" });
      });
  }

  return (
    <View style={styles.RegisterBoxContainer}>
      {showAlert ? <FlashMessage position={"bottom"} /> : <></>}
      <SafeAreaView>
        <UserInput textInput1="Nome" value={registerName} onChangeText={(text) => setRegisterName(text)} />
        <UserInput textInput1="Email" value={registerEmail} onChangeText={(text) => setRegisterEmail(text)} />
        <UserInput textInput1="Senha" value={registerPassword} onChangeText={(text) => setRegisterPassword(text)} />
        <Button style={styles.saveInfoButton} onPress={userRegister}>
          Salvar
        </Button>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  RegisterBoxContainer: {
    flex: 1,
    backgroundColor: "#e7ddd7",
    alignItems: "center",
    justifyContent: "center",
  },

  saveInfoButton: {
    marginTop: 12,
  },
});

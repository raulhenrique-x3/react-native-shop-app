import { Avatar } from "react-native-elements";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { UserInput } from "../components/UserInput";
import { IProps } from "../interface/interface";
import { useState } from "react";
import axios from "axios";

export const Login = (props: IProps) => {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const login = () => props.navigation.navigate("Home");
  const register = () => props.navigation.navigate("Cadastro");

  async function LoginUser() {
    await axios
      .get(`http://192.168.56.1:5000/users/login/${userLogin}/${userPassword}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          login();
        } else return;
      })
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarView}>
        <Avatar
          size={"large"}
          rounded
          icon={{ name: "user-circle-o", type: "font-awesome", color: "#000000", size: 72 }}
        />
      </View>

      <UserInput textInput1="Login" value={userLogin} onChangeText={(text) => setUserLogin(text)} />
      <UserInput
        textInput1="Senha"
        value={userPassword}
        onChangeText={(text) => setUserPassword(text)}
        secureTextEntry={true}
      />

      <SafeAreaView>
        <TouchableOpacity style={styles.userButton}>
          <Button onPress={LoginUser}>Login</Button>
        </TouchableOpacity>

        <TouchableOpacity style={styles.userButton}>
          <Button onPress={register} color="error">
            Cadastre-se
          </Button>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e7ddd7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarView: {
    display: "flex",
    alignItems: "center",
  },

  userButton: {
    width: 200,
    marginBottom: 12,
  },
});

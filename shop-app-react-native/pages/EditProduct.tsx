import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { IProps } from "../interface/interface";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import { UserInput } from "../components/UserInput";
import FlashMessage, { showMessage } from "react-native-flash-message";

export const EditProduct = ({ route }: IProps, props: IProps) => {
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [preco, setPreco] = useState("");
  const [id, setId] = useState(null);
  const [marca, setMarca] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const toProducts = () => props.navigation.navigate("Contatos");

  useEffect(() => {
    if (route.params) {
      const { nome } = route.params;
      const { capacidade } = route.params;
      const { preco } = route.params;
      const { modelo } = route.params;
      const { id } = route.params;

      setNome(nome);
      setCapacidade(capacidade);
      setPreco(preco);
      setMarca(modelo);
      setId(id);
    }
  }, []);

  function putData() {
    axios
      .put("http://192.168.56.1:5000/produtos/" + id, {
        nome: nome,
        capacidade: capacidade,
        preco: preco,
        modelo: marca,
      })
      .then((res) => {
        console.log(res.data);
        setShowAlert(true);
        showMessage({ message: "Dados alterados!" });
        toProducts();
      })
      .catch((error) => {
        console.error(error.response);
        showMessage({ message: "Erro ao alterar dados..." });
      });
  }

  function deleteData() {
    axios
      .delete("http://192.168.56.1:5000/produtos/" + id)
      .then((res) => {
        setNome("");
        setCapacidade("");
        setPreco("");
        setMarca("");
        setId(null);
      })
      .catch((err) => console.error(err.res.data));
  }

  return (
    <View style={styles.container}>
      {showAlert ? <FlashMessage position={"bottom"} /> : <></>}
      <SafeAreaView>
        <UserInput textInput1="Nome" value={nome} onChangeText={(text) => setNome(text)} />
        <UserInput textInput1="Capacidade" value={capacidade} onChangeText={(text) => setCapacidade(text)} />
        <UserInput textInput1="Preço" value={preco} onChangeText={(text) => setPreco(text)} />
        <UserInput textInput1="Marca" value={marca.toLowerCase()} onChangeText={(text) => setMarca(text)} />

        <TouchableOpacity style={styles.userButton} onPress={toProducts}>
          <Button onPress={putData}>Alterar</Button>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userButton}>
          <Button color="error" onPress={deleteData}>
            Excluir
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

  userButton: {
    marginTop: 12,
  },
});

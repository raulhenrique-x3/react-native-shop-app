import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import axios from "axios";
import { IProps } from "../interface/interface";
import { Button } from "@rneui/themed";
import { UserInput } from "../components/UserInput";
import FlashMessage, { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";

export const EditProduct = ({ route }: IProps, props: IProps) => {
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [preco, setPreco] = useState("");
  const [id, setId] = useState(null);
  const [marca, setMarca] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [image, setImage] = useState<null | string>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets?.[0].uri);
    }
  };

  const toProducts = () => props.navigation.navigate("Contatos");

  useEffect(() => {
    if (route.params) {
      const { nome } = route.params;
      const { capacidade } = route.params;
      const { preco } = route.params;
      const { modelo } = route.params;
      const { id } = route.params;
      const { uri } = route.params;

      setNome(nome);
      setCapacidade(capacidade);
      setPreco(preco);
      setMarca(modelo);
      setImage(uri);
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
        uri: image,
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
      <ScrollView>
        <UserInput textInput1="Nome" value={nome} onChangeText={(text) => setNome(text)} />
        <UserInput textInput1="Capacidade" value={capacidade} onChangeText={(text) => setCapacidade(text)} />
        <UserInput textInput1="Preço" value={preco} onChangeText={(text) => setPreco(text)} />
        <UserInput textInput1="Marca" value={marca.toLowerCase()} onChangeText={(text) => setMarca(text)} />

        <TouchableOpacity style={styles.userButton} onPress={toProducts}>
          <Button onPress={putData}>Alterar</Button>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userButton}>
          <Button title="Escolha uma imagem" onPress={pickImage} buttonStyle={{ backgroundColor: "#008000" }} />
          {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, marginTop: 12 }} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.userButton}>
          <Button color="error" onPress={deleteData}>
            Excluir
          </Button>
        </TouchableOpacity>
      </ScrollView>
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

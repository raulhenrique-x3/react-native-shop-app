import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import axios from "axios";
import { IProps } from "../interface/interface";
import { Button } from "@rneui/themed";
import { UserInput } from "../components/UserInput";
import FlashMessage, { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";

export const AddProduct = (props: IProps) => {
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [preco, setPreco] = useState("");
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

  async function postData() {
    await axios
      .post("http://192.168.56.1:5000/produtos/", {
        nome: nome,
        capacidade: capacidade,
        preco: preco,
        modelo: marca,
        uri: image,
      })
      .then((res) => {
        console.log(res.data);
        setShowAlert(true);
        showMessage({ message: "Produto adicionado!" });
      })
      .catch((error) => {
        console.error(error.response);
        showMessage({ message: "Erro ao adicionar produto!" });
      });
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
          <Button onPress={postData}>Salvar</Button>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userButton}>
          <Button title="Escolha uma imagem" onPress={pickImage} buttonStyle={{ backgroundColor: "#008000" }} />
          {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, marginTop: 12 }} />}
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

import axios from "axios";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { Button, Header, Card, Text } from "@rneui/themed";
import { IProps } from "../interface/interface";
import { useIsFocused } from "@react-navigation/native";
import { Modelos } from "../interface/interface";

export const Home = (props: IProps) => {
  const [data, setData] = useState<IProps[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useIsFocused();

  const addProduct = () => {
    props.navigation.navigate("Adicionar");
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://192.168.56.1:5000/produtos")
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
    fetchData();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="gray"
        placement="center"
        centerComponent={{ text: "Produtos", style: { color: "#fff", fontSize: 24, fontWeight: "500" } }}
        rightComponent={
          <Button
            icon={
              <Icon
                name="plus"
                type="feather"
                size={24}
                backgroundColor={"gray"}
                color="white"
                tvParallaxProperties={undefined}
                onPress={addProduct}
              />
            }
            buttonStyle={{ backgroundColor: "gray" }}
          />
        }
      />
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <ScrollView>
          {data.map((product) => (
            <Card key={product?.id}>
              {Modelos[product.modelo!] !== undefined ? (
                <Card.Image
                  style={{ padding: 0, resizeMode: "contain" }}
                  source={{
                    uri: Modelos[product.modelo!],
                  }}
                  onPress={() => {
                    props.navigation.navigate("Editar", {
                      nome: product?.nome,
                      capacidade: product?.capacidade,
                      preco: product?.preco,
                      modelo: product?.modelo,
                      id: product?.id,
                    });
                  }}
                />
              ) : (
                <Card.Image
                  style={{ padding: 0, resizeMode: "contain" }}
                  source={{
                    uri: product?.uri,
                  }}
                  onPress={() => {
                    props.navigation.navigate("Editar", {
                      nome: product?.nome,
                      capacidade: product?.capacidade,
                      preco: product?.preco,
                      modelo: product?.modelo,
                      id: product?.id,
                    });
                  }}
                />
              )}

              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Editar", {
                    nome: product?.nome,
                    capacidade: product?.capacidade,
                    preco: product?.preco,
                    modelo: product?.modelo,
                    id: product?.id,
                  })
                }
              >
                <View>
                  {product?.nome == "undefined" || product?.nome == "" ? (
                    <Text>Produto sem nome</Text>
                  ) : (
                    <Text>{product?.nome}</Text>
                  )}
                  {product?.capacidade == "undefined" || product?.capacidade == "" ? (
                    <Text>N/A</Text>
                  ) : (
                    <Text>{product?.capacidade}</Text>
                  )}
                  {product?.preco == "undefined" || product?.capacidade == "" ? (
                    <Text>N/A</Text>
                  ) : (
                    <Text>R${product?.preco}</Text>
                  )}
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { AddProduct } from "../pages/AddProduct";
import { EditProduct } from "../pages/EditProduct";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={Register} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Adicionar" component={AddProduct} />
      <Stack.Screen name="Editar" component={EditProduct} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

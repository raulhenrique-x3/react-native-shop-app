import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./const/app.navigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

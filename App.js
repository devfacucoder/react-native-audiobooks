import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./pages/Home";
import PageLibro from "./pages/PageLibro";
import PlayAudio from "./pages/PlayAudio";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen name="Inicio" component={Home} />
            <Stack.Screen name="Libro" component={PageLibro} />
            <Stack.Screen name="PlayAudio" component={PlayAudio} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

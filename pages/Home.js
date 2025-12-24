import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useGetLibros from "../hooks/useGetLibros";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home() {
  const { getLibros } = useGetLibros();
  const [libros, setLibros] = useState([]);
  useEffect(() => {
    const loadLibros = async () => {
      const data = await getLibros(); // ✅ await
      setLibros(data);
    };

    loadLibros();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={{ marginTop: 20,backgroundColor:'#fff',padding:10,borderRadius:5 }}
        onPress={async () => {
          await AsyncStorage.clear();
        }}
      >
        borrar cache
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f00",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;

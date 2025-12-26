import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useGetLibros } from "../hooks/useGetLibros";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import CardLibro from "../components/layout/CardLibro";
function Home() {
  const { dataCadaLibro } = useGetLibros();
  const [libros, setLibros] = useState([]);
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: 20,
          width: 120,

          height: 40,
          backgroundColor: "#8c2a2aff",
          padding: 10,
          borderRadius: 5,
        }}
        onPress={async () => {
          await AsyncStorage.clear();
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>Borrar Cache</Text>
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        {dataCadaLibro.map((libro, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Libro", { libro: libro });
            }}
          >
            <CardLibro
              pUrlImage={`https://${libro.domini}${libro.dir}/${libro.png}`}
              pTitle={libro.title}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#121212",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // ✅ centra horizontal
    gap: 10,
    paddingVertical: 10,
  },
  reset: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
});

/**
   * <Text>Home Screen</Text>
        <TouchableOpacity
          style={{ marginTop: 20,backgroundColor:'#fff',padding:10,borderRadius:5 }}
          onPress={async () => {
            await AsyncStorage.clear();
          }}
        >
          borrar cache
        </TouchableOpacity>
  */
export default Home;

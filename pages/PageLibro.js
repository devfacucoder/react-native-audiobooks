import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ItemPlayAudio from "../components/ui/ItemPlayAudio";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

function PageLibro({ route }) {
  const { libro } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* IMAGEN */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `https://${libro.domini}${libro.dir}/${libro.png}` }}
          style={styles.image}
        />
      </View>

      {/* TEXTO CON FADE */}
      <LinearGradient
        colors={["transparent", "rgba(18, 3, 3, 0.7)"]}
        style={styles.textContainer}
      >
        <Text style={styles.title}>{libro.title}</Text>
        <Text style={styles.creator}>{libro.creator}</Text>
        <Text style={styles.description}>{libro.description}</Text>
      </LinearGradient>

      {/* AUDIOS */}
      <View style={styles.audioContainer}>
        {libro.mp3 && libro.mp3.length > 0 ? (
          libro.mp3.map((audio, index) => (
            <TouchableOpacity
              onPress={() => {
                // Handle navigation or other actions if needed
                navigation.navigate("PlayAudio", { audio });
              }}
            >
              <ItemPlayAudio
                title={audio.title}
                url={`https://${libro.domini}${libro.dir}/${audio.file}`}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noAudio}>
            No hay audios disponibles para este libro.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: "#222",
    height: 300,
  },
  image: {
    width: 250,
    height: 300,
    resizeMode: "contain",
  },
  textContainer: {
    padding: 15,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  creator: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    color: "#eee",
    fontSize: 14,
  },
  audioContainer: {
    padding: 10,
  },
  noAudio: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PageLibro;

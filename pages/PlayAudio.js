import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Slider from "@react-native-community/slider";
import { useState } from "react";

function PlayAudio({ route }) {
  const { audio, domini, dir, png } = route.params;
  const player = useAudioPlayer(`https://${domini}${dir}/${audio.name}`);
  const status = useAudioPlayerStatus(player);
  const [aliderActual, setSliderActual] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.playContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `https://${domini}${dir}/${png}` }}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View style={styles.controlsContainer}>
          <Text
            style={{
              position: "absolute",
              left: 40,
              bottom: 40,
              color: "#fff",
            }}
          >
            {Math.floor(aliderActual / 60)}:
            {Math.floor(aliderActual % 60)
              .toString()
              .padStart(2, "0")}
          </Text>
          <Text
            style={{
              position: "absolute",
              right: 40,
              bottom: 40,
              color: "#fff",
            }}
          >
            {Math.floor(status.duration / 60)}:
            {Math.floor(status.duration % 60)
              .toString()
              .padStart(2, "0")}
          </Text>
          <Text style={{ textAlign: "center", color: "#fff" }}>
            Reproduciendo: {audio.title}
          </Text>
          <Slider
            style={{ width: "100%", height: 40, fontSize: 30 }}
            minimumValue={0}
            value={status.currentTime}
            maximumValue={status.duration}
            minimumTrackTintColor="#f00"
            maximumTrackTintColor="#fff"
            onValueChange={(v) => {
              setSliderActual(v);
            }}
            onSlidingComplete={(v) => {
              player.seekTo(v);

              player.play();
            }}
          />
          <View>
            {status.playing ? (
              <TouchableOpacity
                onPress={() => {
                  player.pause();
                }}
              >
                <FontAwesome5 name="pause-circle" size={44} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  player.play();
                }}
              >
                <Feather name="play-circle" size={44} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "start",
    alignItems: "start",
  },
  playContainer: {},
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  controlsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
});

export default PlayAudio;

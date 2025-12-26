import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { View, Text, StyleSheet } from "react-native";
function PlayAudio({ route }) {
  const { audio } = route.params;
  const player = useAudioPlayer();

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Reproduciendo: {audio.title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlayAudio;

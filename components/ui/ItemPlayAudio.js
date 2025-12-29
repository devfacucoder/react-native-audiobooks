import { View, Text, StyleSheet } from "react-native";

function ItemPlayAudio({ pTitle }) {
  return (
    <View style={styles.ItemPlayAudio}>
      <Text style={{ color: "#fff" }}>{pTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ItemPlayAudio: {
    width: "100%",
    height: 60,
    backgroundColor: "#222",
    marginBottom: 10,
    justifyContent: "center",
    paddingLeft: 10,
  },
});
export default ItemPlayAudio;

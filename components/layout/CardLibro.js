import { View, Text, StyleSheet, Image } from "react-native";

function CardLibro({ pTitle, pUrlImage }) {
  return (
    <View style={styles.card}>
      <View>
        <Image
          style={{ width: 150, height: 180, borderRadius: 10 }}
          source={{
            uri: pUrlImage,
          }}
        />
      </View>
      <Text style={styles.title}>{pTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0e2c3aff",
    borderRadius: 10,
    width: 150,
    height: 220,
  },
  title: {
    color: "#78c2ffff",
    height: 40,
    textAlign: "center",
    overflow: "hidden",
  },
});
export default CardLibro;

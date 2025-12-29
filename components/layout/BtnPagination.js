import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

function BtnPagination({ pageActual, setPageActual }) {
  const pages = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {pages.map((page) => (
        <TouchableOpacity
          key={page}
          style={[
            styles.button,
            pageActual === page && styles.activeButton,
          ]}
          onPress={() => setPageActual(page)}
        >
          <Text style={styles.text}>{page}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    gap: 6,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#1e90ff",
  },
  text: {
    color: "#78c2ffff",

    fontWeight: "bold",
  },
});

export default BtnPagination;

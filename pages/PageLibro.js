import { View,Text,StyleSheet } from "react-native"; 

function PageLibro() {
    return (
        <View>
            <Text style={styles.text}>
                Página de Libro
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    text:{
        color: "#fff",
    }
});
    export default PageLibro;
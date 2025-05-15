import { StyleSheet, Text , View} from "react-native";

export default function Start(){
    return(
        <View style={styles.page}>
        <Text>This is the Start page.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex:1,
        backgroundColor: 'black'
    }
})
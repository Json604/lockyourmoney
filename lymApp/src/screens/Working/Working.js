import { View, Text, StyleSheet } from "react-native";

export default function Working() {
    return (
        <View style={styles.page}>
            <View style={styles.hero}>
                <Text style={styles.h1}>Secure your savings.</Text>
                <Text style={styles.h2}>Control your spending.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'black',
    },

    hero: {
        position: 'absolute',
        top: '15%', // Positions the hero section at 25% of screen height
        alignItems: 'center',
        width: '100%',
    },

    h1: {
        color: 'gold',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'DancingScript-Regular'
    },

    h2: {
        color: 'white',
        fontSize: 24,
    }
});

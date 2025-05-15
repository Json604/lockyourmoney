import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../../context/useTheme";


export default function Working() {
    const {primary,text,background} = useContext(ThemeContext)

    return (
        <View style={[styles.page , {backgroundColor: background}]}>
            <View style={styles.hero}>
                <Text style={[styles.h1 , {color: primary}]}>Secure your savings.</Text>
                <Text style={[styles.h2 , {color: text}]}>Control your spending.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },

    hero: {
        position: 'absolute',
        top: '15%', 
        alignItems: 'center',
        width: '100%',
    },

    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'DancingScript-Regular'
    },

    h2: {
        fontSize: 24,
    }
});

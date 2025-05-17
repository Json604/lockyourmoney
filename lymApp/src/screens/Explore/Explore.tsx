import { useContext, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { ThemeContext } from "../../context/useTheme";
import DynCard from "../../components/ui/dynCard";
import { TabParamList } from "../../navigation/AppNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Animated, { useAnimatedStyle, interpolate, Extrapolate, useSharedValue } from "react-native-reanimated";

const { width } = Dimensions.get("window");

type props = BottomTabScreenProps<TabParamList, "Explore">;

const cardData = [
    {
        id: "1",
        title: "Secure Savings",
        subtitle: "Protect what you save",
        description: "Bank-level security ensures your savings stay safe and untouched. Unauthorized access is blocked while you stay in control.",
        color: "rgb(180, 144, 0)",
        image: require("../../assets/car1.jpeg")
    },
    {
        id: "2",
        title: "Time-Based Locks",
        subtitle: "Save without temptation",
        description: "Set a custom duration for locking your money. Need it early? Withdraw with a 5% penalty to build better habits.",
        color: "rgb(80, 80, 80)",
        image: require("../../assets/car2.jpeg")
    },
    {
        id: "3",
        title: "Growth Tracking",
        subtitle: "Visualize your progress",
        description: "Track your savings growth over time and get insights into how your financial habits are improving.",
        color: "rgb(255, 235, 128)",
        image: require("../../assets/car3.jpeg")
    },
    {
        id: "4",
        title: "How It Works",
        subtitle: "Locking in 4 simple steps",
        description: "1. Enter amount\n2. Set duration\n3. Lock money\n4. Get it back after time ends.\nSimple, secure, and stress-free.",
        color: "rgb(40, 40, 40)",
        image: require("../../assets/car4.jpeg")
    }
];

export default function Explore({ navigation }: props) {
    const { primary, text, background, subtext } = useContext(ThemeContext);
    const carouselRef = useRef<ICarouselInstance>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View style={[styles.page, { backgroundColor: background }]}>
            <View style={styles.hero}>
                <Text style={[styles.h1, { color: primary }]}>Secure your savings.</Text>
                <Text style={[styles.h2, { color: text }]}>Control your spending.</Text>
                <Text style={[styles.h3, { color: subtext }]}>
                    Take control of your financial future with our innovative savings lock system.
                </Text>

                <DynCard
                    style={[styles.navbtn, { backgroundColor: primary }]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{ fontWeight: "bold" }}>Start Locking</Text>
                </DynCard>

                <View style={styles.carouselWrapper}>
                    <Carousel
                        autoPlay
                        autoPlayInterval={3000}
                        mode="parallax"
                        ref={carouselRef}
                        data={cardData}
                        width={width * 0.8}
                        height={600}
                        style={{ marginTop: 30 }}
                        scrollAnimationDuration={500}
                        onSnapToItem={setCurrentIndex}
                        renderItem={({ item, index, animationValue }) => {
                            const animatedStyle = useAnimatedStyle(() => {
                                const scale = interpolate(
                                    animationValue.value,
                                    [-1, 0, 1],
                                    [0.85, 1, 0.85],
                                    Extrapolate.CLAMP
                                );
                                return {
                                    transform: [{ scale }],
                                };
                            });

                            return (
                                <Animated.View style={[styles.card, { backgroundColor: item.color }, animatedStyle]}>
                                    <Image source={item.image} style={styles.img}/>
                                    {/* <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text style={styles.cardTitle}>{item.subtitle}</Text>
                                    <Text style={styles.cardTitle}>{item.description}</Text> */}
                                </Animated.View>
                            );
                        }}
                    />

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1 },
    hero: { position: "absolute", top: "10%", alignItems: "center", width: "100%" },
    h1: { fontSize: 32, fontWeight: "bold", marginBottom: 10, fontFamily: "DancingScript-Regular" },
    h2: { fontSize: 24, marginBottom: 10 },
    h3: { fontSize: 14, textAlign: "center", marginHorizontal: 40 },
    navbtn: { marginTop: 40 },
    carouselWrapper: { marginTop: -40, alignItems: "center" },
    card: { width: "100%", height: 600, borderRadius: 16, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 4 },
    img: { width: "100%", height: 600,borderRadius: 16,},
    // cardTitle: { color: "#fff", fontWeight: "bold", fontSize: 24, marginBottom: 10 },
    // cardSubtitle: { color: "#f0f0f0", fontSize: 18, marginBottom: 10 },
    // cardDescription: { color: "#e0e0e0", fontSize: 14, textAlign: "center", paddingHorizontal: 20 },
});

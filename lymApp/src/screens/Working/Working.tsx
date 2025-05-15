import { useContext, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ThemeContext } from "../../context/useTheme";
import DynCard from "../../components/ui/dynCard";
import { TabParamList } from "../../navigation/AppNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Animated, { useAnimatedStyle, interpolate, Extrapolate, useSharedValue } from "react-native-reanimated";

const { width } = Dimensions.get("window");

type props = BottomTabScreenProps<TabParamList, "Working">;

const cardData = [
    { id: "1", title: "Analytics", color: "rgb(180, 144, 0)" },    
    { id: "2", title: "Rewards", color: "rgb(80, 80, 80)" },       
    { id: "3", title: "Social", color: "rgb(255, 235, 128)" },
    { id: "4", title: "Functions", color: "rgb(40, 40, 40)" },
];

export default function Working({ navigation }: props) {
    const { primary, text, background, subtext } = useContext(ThemeContext);
    const carouselRef = useRef<ICarouselInstance>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View style={[styles.page, { backgroundColor: background }]}>
            <View style={styles.hero}>
                <Text style={[styles.h1, { color: primary }]}>Secure your savings.</Text>
                <Text style={[styles.h2, { color: text }]}>Control your spending.</Text>
                <Text style={[styles.h3, { color: subtext }]}>
                    Take control of your financial future with our innovative savings lock
                    system.
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
                        width={width * 0.7}
                        height={480}
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
                                    <Text style={styles.cardText}>{item.title}</Text>
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
  carouselWrapper: { marginTop: 30, alignItems: "center" },
  card: { width: "100%", height: 500, borderRadius: 16, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 4 },
  cardText: { color: "#fff", fontWeight: "bold", fontSize: 18 }
});

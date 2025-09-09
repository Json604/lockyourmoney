import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { FloatingPlaceholderType } from '../../types/compTypes';


const FloatingPlaceholderInput: React.FC<FloatingPlaceholderType> = ({
  label,
  value,
  onChangeText,
  placeholderTextColor = 'grey',
  inputStyle = {},
  containerStyle = {},
  secureTextEntry = false,
  keyboardType = 'default'
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
    
    useEffect(() => {
        Animated.timing(animatedIsFocused, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute',
        left: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [22, 11],
        }),
        top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [18, -8],
        }),
        fontSize: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 12],
        }),
        color: 'grey',
        backgroundColor:'#2e2b2bff',
        paddingHorizontal: 5,
        zIndex: 1
    };

    return (
        <View style={[styles.inputWrapper, containerStyle]}>
            <Animated.Text style={labelStyle as any}>
                {label}
            </Animated.Text>
            <BottomSheetTextInput
                style={[styles.input, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        position: 'relative',
        marginHorizontal: 15,
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        padding: 15,
        // paddingTop: 20,
        color: 'white',
        fontSize: 16,
    },
});

export default FloatingPlaceholderInput;

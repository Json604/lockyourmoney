import React, { useContext } from 'react';
import {StyleSheet, TextInput} from 'react-native';
import { ThemeContext } from '../../context/useTheme';

const CompTextInput = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const {subtext} = useContext(ThemeContext);

  return (
    <TextInput
        style={[styles.input,{borderColor:subtext}]}
        onChangeText={onChangeText}
        value={text}
    />
  );
};

const styles = StyleSheet.create({
  input: {height: 40,margin: 12,borderWidth: 1,padding: 10,borderRadius:8,},
});

export default CompTextInput;
import React, { useContext } from 'react';
import {StyleSheet, TextInput,TextInputProps} from 'react-native';
import { ThemeContext } from '../../context/useTheme';

const CompTextInput = (props:TextInputProps) => {
  const [input, setInput] = React.useState('');
  const {text,subtext} = useContext(ThemeContext);

  return (
    <TextInput
        style={[styles.input,{borderColor:subtext,color:text}]}
        onChangeText={setInput}
        value={input}
        placeholderTextColor={subtext}
        {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {height: 50,marginHorizontal:12,borderWidth: 1,padding: 10,borderRadius:8,},
});

export default CompTextInput;
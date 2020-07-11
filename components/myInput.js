import React from 'react';
import { View, TextInput } from 'react-native';

export default function MyInput(props) {
  return (
    <TextInput
      editable
      maxLength={40}
      {...props}
    />
  );
}


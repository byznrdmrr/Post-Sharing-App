import React, {useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import {login_page_styles} from '../styles/page_styles';
import auth from '@react-native-firebase/auth';

import {CustomButton} from '../components/Button';

const Login = ({navigation}) => {
  // auth().signOut();

  const [email, setEmail] = useState('');
  const [password, setPssword] = useState('');
  // const [error, setError] = useState({});
  function signIn() {
    if (email === '') {
      Alert.alert('Email alanı boş bırakılamaz');
    } else if (password === '') {
      Alert.alert('Password alanı boş bırakılamaz');
    } else if (email && password === '') {
      Alert.alert('Email ve password alanı boş bırakılamaz');
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => console.log(response))
        .catch(({code, message}) => Alert.alert(code, message));
    }
  }
  return (
    <View style={login_page_styles.container}>
      <View style={login_page_styles.formContainer}>
        <View style={login_page_styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email Address"
            placeholderTextColor="black"
            onChangeText={(val) => setEmail(val)}
          />
        </View>
        <View style={login_page_styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry
            onChangeText={(val) => setPssword(val)}
          />
        </View>
        <CustomButton
          title="Giriş Yap"
          style={{marginHorizontal: 10}}
          onClick={signIn}
        />
        <CustomButton
          title="Kayıt Ol"
          style={{marginHorizontal: 10}}
          color="orange"
          onClick={() => navigation.navigate('Sign')}
        />
      </View>
    </View>
  );
};

export {Login};

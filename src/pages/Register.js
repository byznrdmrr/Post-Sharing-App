import React, {useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import {login_page_styles} from '../styles/page_styles';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import wait from 'waait';
import {CustomButton} from '../components/Button';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  async function FireBaseRegister() {
    if (password === Confirmpassword) {
      setError({});
      setLoading(true);
      await wait(1000);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then()
        .catch(({code}) => {
          setLoading(false);
          switch (code) {
            case 'auth/invalid-email':
              setError({email: '*Geçersiz bir e-mail girdiniz.'});
              break;

            case 'auth/email-already-in-use':
              setError({
                email: '*Bu email başka bir kullanıcı tarafından kullanılıyor.',
              });
              break;

            case 'auth/weak-password':
              setError({password: '*Daha güçlü bir şifre giriniz'});
              break;

            default:
              setError({unexpected: '*Beklenmeyen bir hata oluştu'});
              break;
          }
        });
    } else {
      setError({password: '*Şifreler Uyuşmuyor.'});
    }
  }

  if (loading) {
    return (
      <View style={login_page_styles.loadingContainer}>
        <LottieView source={require('../assets/loading.json')} autoPlay loop />
      </View>
    );
  }
  return (
    <View style={login_page_styles.container}>
      <View style={login_page_styles.formContainer}>
        <Icon
          style={login_page_styles.icon}
          name="artstation"
          size={150}
          color="#5472d3"
        />
        {error ? <Text> {Object.values(error)} </Text> : null}
        <View style={login_page_styles.inputContainer}>
          <TextInput
            style={{borderWidth: error.email ? 1 : 0, borderColor: 'tomato'}}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email Address"
            placeholderTextColor="gray"
            onChangeText={(val) => setEmail(val)}
          />
        </View>
        <View style={login_page_styles.inputContainer}>
          <TextInput
            style={{borderWidth: error.password ? 1 : 0, borderColor: 'tomato'}}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry
            onChangeText={(val) => setPassword(val)}
          />
        </View>
        <View style={login_page_styles.inputContainer}>
          <TextInput
            style={{borderWidth: error.password ? 1 : 0, borderColor: 'tomato'}}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            secureTextEntry
            onChangeText={(val) => setConfirmPassword(val)}
          />
        </View>
        <CustomButton
          title="Kayıt Ol"
          style={{marginHorizontal: 10}}
          onClick={FireBaseRegister}
        />
        <CustomButton
          title="Vazgeç"
          style={{marginHorizontal: 10}}
          color="orange"
          onClick={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export {Register};

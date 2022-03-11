import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';


export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously(){
    const { user } = await auth().signInAnonymously();
    console.log(user);
  }

  
  function handleCreateUserAccount() {
    auth().createUserWithEmailAndPassword(email, password)
    .then(() => Alert.alert('Usuário criado com sucesso!'))
    .catch(error => {
      console.log(error.code)

      if(error.code === 'auth/email-already-in-use') {
        return Alert.alert('Email já cadastrado!');
      }
    });
  }
  
  async function handleSingInWithEmailAndPassword() {
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(({user}) => console.log(user))
    .catch(error => {
      console.log(error.code);

      if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
        Alert.alert('Usuário ou senha não são validos!')
      }
    })
  }

  function handleForgotPassord(){
    auth().sendPasswordResetEmail(email)
    .then(()=> Alert.alert('Enviamos um link no seu email p redefinir a senha.'));
  }

  

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSingInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassord} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}
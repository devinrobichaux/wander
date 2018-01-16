import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, ImageBackground, Text, KeyboardAvoidingView, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import logo from '../img/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#fff',
  },
});

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }
  login() {
    console.log(this.state.email);
    console.log(this.state.password);
    this.props.navigation.navigate('Dashboard');
  }
  render() {
    return (
      <ImageBackground
        style={{
          backgroundColor: '#ccc',
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
        source={require('../img/NYC.jpg')}
      >
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <Image source={logo} style={{ width: 100, height: 100, marginBottom: 250 }} />
          <Text>Placeholder for Facebook</Text>
          <Text>Placeholder for Google</Text>
          <TextInput
            style={styles.textInput}
            placeholder="email@email.com"
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            onChangeText={text => this.setState({ password: text })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.login}
          >
            <Text style={{ fontSize: 20 }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            <Text style={{ fontSize: 20 }}>Signup</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object,
};

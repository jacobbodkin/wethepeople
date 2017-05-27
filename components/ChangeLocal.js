import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TabBarIOS,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  AlertIOS
} from 'react-native';


class ChangeLocal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressInput: '',
      cityInput: '',
      stateInput: '',
      zipInput: ''
    }
  }

  onPressAddress(address, city, usState, zip) {
    if(address && city && usState && zip) {
      this.props.changeAddress(address, city, usState, zip)
      this.setState({
        addressInput: '',
        cityInput: '',
        stateInput: '',
        zipInput: ''
      })
    } else {
      AlertIOS.alert(
       'Please fill out your full address'
      );
    }
  }

  closeKeyboard() {
    Keyboard.dismiss();
  }

  render() {

    const address = this.state.addressInput;
    const city = this.state.cityInput;
    const usState = this.state.stateInput;
    const zip = this.state.zipInput;

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={ styles.changeLocal }>
          <Text style={ styles.question }>
            Where are you registered to vote?
          </Text>
          <View style={ styles.inputBlock }>
            <View style={ styles.textInput }>

              <TextInput
                ref="address"
                style={ styles.input }
                onChangeText={ input => this.setState({ addressInput: input }) }
                placeholder="Address"
                value={ this.state.addressInput }
                returnKeyType='next'
                autoCapitalize="words"
                onSubmitEditing={(event) => {
                  this.refs.city.focus();
                } }
              />
            </View>
            <View style={ styles.textInput }>
              <TextInput
                ref="city"
                style={ styles.input }
                onChangeText={ input => this.setState({ cityInput: input }) }
                placeholder="City"
                value={ this.state.cityInput }
                returnKeyType='next'
                autoCapitalize="words"
                onSubmitEditing={(event) => {
                  this.refs.state.focus();
                } }
              />
            </View>
            <View style={ styles.textInput }>
              <TextInput
                ref="state"
                style={ styles.input }
                onChangeText={ input => this.setState({ stateInput: input }) }
                placeholder="State"
                value={ this.state.stateInput }
                returnKeyType='next'
                autoCapitalize="characters"
                onSubmitEditing={(event) => {
                  this.refs.zip.focus();
                } }
              />
            </View>
            <View style={ styles.textInput }>
              <TextInput
                ref="zip"
                style={ styles.input }
                onChangeText={ input => this.setState({ zipInput: input }) }
                placeholder="Zip"
                value={ this.state.zipInput }
                keyboardType="numbers-and-punctuation"
                returnKeyType='go'
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={ styles.button }
              onPress={ () => this.onPressAddress(address, city, usState, zip) }
              >
              <Text style={ styles.buttonText }>See your Representatives!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>

    )
  }
}

const styles = StyleSheet.create({
changeLocal: {
  flex: 9,
  flexDirection: 'column',
  justifyContent: 'center'
},

question: {
  textAlign: 'center',
  fontSize: 25,
  marginHorizontal: '2%',
  marginTop: '10%',
  marginBottom: '8%'
},

inputBlock: {
  
  flexDirection: 'column',
  marginLeft: '10%',
  alignContent: 'center',
  justifyContent: 'center',
  width: '80%',
  marginBottom: '10%',
  shadowColor: '#141414',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 10,
  shadowOpacity: 0.25
},

textInput: {
height: 60,
},

input: {
  flex: 1,
  textAlign: 'left',
  margin: 20,
  paddingLeft: '10%',
},

buttonContainer:{
  flex: 1,
  alignItems: 'center',
  marginBottom: '15%'
},

button:{
  width: '80%',
  backgroundColor: '#2E9298',
  borderRadius: 10,
  padding: '2%',
  shadowColor: '#141414',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 10,
  shadowOpacity: 0.25
},

buttonText:{
  color: 'white',
  paddingVertical: '3%',
  textAlign: 'center',
  fontSize: 20
},

});

export default ChangeLocal;

import React, { Component } from 'react';
import Rep from './Rep'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TabBarIOS,
  Button,
  TouchableHighlight,
  Image,
  StatusBar
} from 'react-native';

import heroImage from '../assets/images/caleb-wright-14716.jpg';


class Home extends Component {

componentDidMount() {
  StatusBar.setBarStyle('light-content', true)
}


  render() {
    const address = this.props.address;

    return(
      <View style={ styles.home }>

        <View style={ styles.homeVal }>
          <View style={styles.homeText}>
            <Text style= {styles.text} >We see you're located at:</Text>
            <Text style={ styles.locationStreet }>{ address.street }</Text>
            <Text style={ styles.locationCity }>{ address.city }, { address.state} { address.zipCode }</Text>
            <Text style= {styles.text} >Is this where you are registered to vote?</Text>
          </View>

          <View style= { styles.valButtons}>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                underlayColor="#549E95"
                style={ styles.button }
                onPress={ () => this.props.changePage('repPage') }
                >
                <Text style={ styles.buttonText }>Yes! Take me to my reps</Text>
              </TouchableHighlight>
            </View>
              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  underlayColor="#549E95"
                  style={ styles.button }
                  onPress={ () => this.props.changePage('changeLocal') }
                  >
                  <Text style={ styles.buttonText }>No, I'll input my address</Text>
                </TouchableHighlight>
              </View>
          </View>
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  home:{
    flex: 9,
    flexDirection: 'column'
  },

  homeInfo: {
    flex: 1,
  },

  homeVal:{
    flexDirection: 'column',
    marginTop: '40%'

  },
  homeText:{
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10%',

  },
  locationStreet:{
    fontSize: 20,
    marginTop: '1%',
    color: '#141414',
    paddingVertical: '2%'
  },
  locationCity:{
    fontSize: 20,
    marginBottom: '2%',
    color: '#141414'
  },
  valButtons:{
    flexDirection:'row'
  },
  buttonContainer:{
    flex: 1,
    alignItems: 'center',
    marginTop: '1%'
  },
  button:{
    width: '80%',
    backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: '3%',
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
    paddingVertical: '4%',
    textAlign: 'center',
    fontSize: 20
  },
  text: {
    color: '#141414',
    fontSize: 16
  }

});
export default Home;

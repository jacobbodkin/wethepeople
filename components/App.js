import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TabBarIOS
} from 'react-native';

import Home from './Home';
import ChangeLocal from './ChangeLocal';
import GoVote from './GoVote';
import Header from './Header';
import RepPage from './RepPage';


class App extends Component {
  constructor(props) {
    super(props)


    this.state = {
      selectedTab: 'home',
      latitude: '',
      longitude: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      fedReps: [],
      stateReps: [],
      localReps: []
    }

  }

//getting lat and long from phone
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        this.setState({
          latitude: latitude,
          longitude: longitude
        });
        this.getAddressFromLatLong();
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }


//changing lat and long to address
  getAddressFromLatLong() {
    fetch(`http://api.geonames.org/findNearestAddressJSON?lat=${ this.state.latitude }&lng=${ this.state.longitude }&username=wethepeople`)
    .then(function(response) {
      return response.json()
    })
    .then(data => {
      this.setState({
        address: {
          street: data.address.streetNumber+' '+data.address.street,
          state: data.address.adminCode1,
          zipCode: data.address.postalcode,
          city: this.getCity(data)
        }
      });
      this.getReps();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getCity(data) {
    if(data.address.placename.length>1) {
      return data.address.placename
    } else {
      data.address.adminName2
    }
  }

//changing address
  changeAddress(street, city, state, zipCode) {
    this.setState({
      address: {
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
      },
      selectedTab: 'repPage',
      fedReps: [],
      stateReps: [],
      localReps: []
    }, this.getReps.bind(this));
  }

  changePage(page) {
    this.setState({
      selectedTab: page
    });
  }


//getting reps
  getReps() {

    let address = this.state.address.street.replace(/\s/g, "%20");
    let city = this.state.address.city.replace(/\s/g, "%20");
    let state = this.state.address.state;
    let zipCode = this.state.address.zipCode;

    fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyB6NrpRei3RgGwXreJOfnM3f9hSeX1wtns&address=${ address }+${ city }+${ state }+${ zipCode }`)
      .then(response => response.json())
      .then((response) => {
        this.seperateReps(response)
      })
  }


  seperateReps(response) {
    let localIndex=[]
    let stateIndex=[]
    let federalIndex=[]
    for (let i=0, x=response.offices.length; i<x; i++) {
      if(response.offices[i].divisionId.indexOf("place")>-1 || response.offices[i].divisionId.indexOf("county")>-1) {
        localIndex.push.apply(localIndex, [{
          title: response.offices[i].name,
          index: response.offices[i].officialIndices
        }])
      } else if(response.offices[i].name.indexOf("United")>-1) {
        federalIndex.push.apply(federalIndex, [{
          title: response.offices[i].name,
          index: response.offices[i].officialIndices
        }])
      } else {
        stateIndex.push.apply(stateIndex, [{
          title: response.offices[i].name,
          index: response.offices[i].officialIndices
        }])
      }
    }

    let fedReps = []
    for(let i=0, x=federalIndex.length; i<x; i++) {
      for(let j=0, y=federalIndex[i].index.length; j<y; j++) {
        fedReps.push.apply(fedReps, [{
          title: federalIndex[i].title,
          info: response.officials[federalIndex[i].index[j]]
        }])
      }
    }

    let stateReps = []
    for(let i=0, x=stateIndex.length; i<x; i++) {
      for(let j=0, y=stateIndex[i].index.length; j<y; j++) {
        stateReps.push.apply(stateReps, [{
          title: stateIndex[i].title,
          info: response.officials[stateIndex[i].index[j]]
        }])
      }
    }

    let localReps = []
    for(let i=0, x=localIndex.length; i<x; i++) {
      for(let j=0, y=localIndex[i].index.length; j<y; j++) {
        localReps.push.apply(localReps, [{
          title: localIndex[i].title,
          info: response.officials[localIndex[i].index[j]]
        }])
      }
    }

    this.setState({
      fedReps: fedReps,
      stateReps: stateReps,
      localReps: localReps
    });
  }







  render() {

    const address = this.state.address

    return(
        <View style={styles.app}>

          <TabBarIOS
            barTintColor="white"
            tintColor="#352245"
            unselectedItemTintColor="#352245"
            unselectedTintColor="#352245"
            >

            <Icon.TabBarItem
              style={ styles.bottomBar }
              title="Home"
              iconName="ios-home-outline"
              selectedIconName="ios-home"
              selected={this.state.selectedTab === 'home'}
              onPress={() => {
                this.setState({
                  selectedTab: 'home'
                });
              }}>
              <View style={ styles.appContainer }>
                <Header />
                <Home address={ address } changePage={ this.changePage.bind(this) }/>
              </View>
            </Icon.TabBarItem>

            <Icon.TabBarItem
              title="Representatives"
              iconName="ios-man-outline"
              selectedIconName="ios-man"
              selected={this.state.selectedTab === 'repPage'}
              onPress={() => {
                this.setState({
                  selectedTab: 'repPage'
                });
              }}>

              <View style={ styles.appContainer }>
                <Header />
                <RepPage
                  fedReps={ this.state.fedReps }
                  stateReps={ this.state.stateReps }
                  localReps={ this.state.localReps }
                />
              </View>

            </Icon.TabBarItem>

            <Icon.TabBarItem
              title="Change Location"
              iconName="ios-pin-outline"
              selectedIconName="ios-pin"
              selected={this.state.selectedTab === 'changeLocal'}
              onPress={() => {
                this.setState({
                  selectedTab: 'changeLocal'
                });
              }}>

              <View style={ styles.appContainer }>
                <Header />
                <ChangeLocal address={ address } changeAddress={ this.changeAddress.bind(this) } />
              </View>

            </Icon.TabBarItem>

            {/* <Icon.TabBarItem
              title="Go Vote"
              iconName="md-checkmark-circle-outline"
              selectedIconName="md-checkmark-circle-outline"
              selected={this.state.selectedTab === 'goVote'}
              onPress={() => {
                this.setState({
                  selectedTab: 'goVote'
                });
              }}>
              <View style={ styles.appContainer }>
                <Header />
                <GoVote address={ address } />
              </View>
            </Icon.TabBarItem> */}
          </TabBarIOS>
        </View>

    )
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,

  },
  appContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  bottomBar: {
    flex: 1
  }

});

export default App;

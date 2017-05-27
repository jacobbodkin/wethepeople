import  React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  Image,
  Button,
  TouchableOpacity,
  View
} from 'react-native';

import MoreInfo from './MoreInfo';

import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';

class Rep extends Component {
  constructor(props){
    super(props);

    this.state = {
      showInfo: false,
    }
  }

  clickForInfo() {
    this.setState({
      showInfo: !this.state.showInfo
    });
  }

  renderInfo() {
    if(this.state.showInfo) {
      return(
        <MoreInfo reps={ this.props.reps } />

      )
    }
  }

  renderPhone() {
    if (this.props.reps.info.phones) {
      return(
        <TouchableOpacity onPress={ () => this.callPhone() }>

          <Icon style={styles.icon} name="phone" color="#549E95" />

        </TouchableOpacity>
      )
    }
  }

  callPhone() {
    console.log(this.props.reps.info.phones)
    if(this.props.reps.info.phones) {
      Communications.phonecall( this.props.reps.info.phones[0], true)
    }
  }

  renderEmail() {
    if (this.props.reps.info.emails) {
      return(
        <TouchableOpacity onPress={() => this.emailEmail() }>

          <Icon style={styles.icon} name="envelope" color="#549E95" />

        </TouchableOpacity>
      )
    }
  }

  emailEmail() {
    console.log(this.props.reps.info.emails)
    if(this.props.reps.info.emails) { Communications.email(this.props.reps.info.emails,null,null,null,null)}
  }

  whichChevron() {
    if(!this.state.showInfo) {
      return(
        <TouchableOpacity onPress={() => this.clickForInfo() }>
          <Icon style={styles.arrow} name="angle-down" color="#549E95" />
        </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity onPress={() => this.clickForInfo() }>
          <Icon style={styles.arrow} name="angle-up" color="#549E95" />
        </TouchableOpacity>
      )
    }
  }

  renderParty() {
    if(this.props.reps.info.party) {
      return(
        this.props.reps.info.party
      )
    } else {
      return(
        'Unknown'
      )
    }
  }


  render(){

    return(

      <TouchableOpacity style={ styles.repContainer } onPress={ () => this.clickForInfo() }>
        <View style={ styles.rowContainer }>
          <View style={ styles.rowTitle }>
            <Text style={ styles.titleText }>{ this.props.reps.title }, { (() => this.renderParty())() }</Text>
          </View>
          <View style={styles.rowInfo}>
            <TouchableOpacity onPress={ () => this.clickForInfo() }>
              <Text style={styles.name}>{this.props.reps.info.name}</Text>
            </TouchableOpacity>

            <View style={ styles.icons }>
              { (() => this.renderEmail())() }

              { (() => this.renderPhone())() }

            </View>
          </View>
        </View>
        { (() => this.renderInfo())() }
        { (() => this.whichChevron())() }
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create ({
  repContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  rowContainer: {
    flex: 1,
    paddingTop: 5
  },
  rowTitle: {
    flex: 1,
    paddingLeft: 2
  },
  titleText: {
    fontSize: 12,
    color: '#141414',
    marginLeft: 7,
    marginTop: 4,
  },
  rowInfo:{
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    marginVertical: 3
  },
  name: {
    color: '#141414',
    fontSize: 22
  },
  party:{
    fontSize: 12,
    color: '#141414'
  },
  icons: {
    flexDirection: 'row'
  },
  icon: {
    fontSize: 35,
    paddingHorizontal: 20,
  },
  arrow: {
    fontSize: 15,
    paddingHorizontal: 20,
    textAlign: 'center'
  },
  text: {
    color: '#141414'
  }
});

export default Rep;

import  React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Text,
  ListView,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Animated
} from 'react-native';


class HideableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(this.props.visible ? 1 : 0)
    }
  }

  animate(show) {
    const duration = this.props.duration ? parseInt(this.props.duration) : 500;
    Animated.timing(
      this.state.opacity, {
        toValue: show ? 1 : 0,
        duration: !this.props.noAnimation ? duration : 0
      }
    ).start();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.visible !== nextProps.visible;
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.visible !== nextProps.visible) {
      this.animate(nextProps.visible);
    }
  }

  render() {
    if (this.props.removeWhenHidden) {
      return (this.visible && this.props.children);
    }
    return (
      <Animated.View style={{opacity: this.state.opacity}}>
        {this.props.children}
      </Animated.View>
    )
  }
}

HideableView.propTypes = {
  visible: PropTypes.bool,
  duration: PropTypes.number,
  removeWhenHidden: PropTypes.bool,
  noAnimation: PropTypes.bool
}

export default HideableView;



'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  PickerIOS,
  View,
  Image,
  TouchableHighlight,
  NavigatorIOS
} = React;



var Button = require('react-native-button');

var Form = require('./Form');

var ReceptionApp = React.createClass({
  getInitialState() {
    return {
      navigationBarHidden: false
    }
  },

  render() {
    return (
      <NavigatorIOS ref="nav"
        itemWrapperStyle={styles.navWrap}
        style={styles.nav}
        navigationBarHidden={this.state.navigationBarHidden}
        initialRoute={{
          title: "Fill out the fields below",
          component: Form
        }} />
    );
  }
});

// camelCase instead of dashes.
// eg. instead of margin-left, it's marginLeft.
var styles = StyleSheet.create({
  navWrap: {
    flex: 1,
    marginTop: 70
  },
  nav: {
    flex: 1
  }
});

AppRegistry.registerComponent('ReceptionApp', () => ReceptionApp);

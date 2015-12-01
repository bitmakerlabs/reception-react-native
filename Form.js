'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  PickerIOS,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

var PickerItemIOS = PickerIOS.Item;

var Button = require('react-native-button');

var PhotoCapture = require('./PhotoCapture');

var Form = React.createClass({
  statics: {
    title: "Review your picture"
  },

  getInitialState() {
    return {
      firstName: "",
      lastName: "",
      host: 0,
      hosts: []
    }
  },

  _handleChangePage() {
    this.props.navigator.push({
      title: PhotoCapture.title,
      component: PhotoCapture,
      passProps: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        host: this.state.host,
        baseUrl: this.props.baseUrl
      }
    });
  },

  componentDidMount() {
    // fetch the list of hosts.
    // a host is the person who the visitor wants to see.
    // XXX: what about fetching from local device? how do you do that?
    fetch(this.props.baseUrl + "/hosts.json")
      .then((response) => response.json())
      .then((responseJson) => {
        var middleHostIndex = Math.round(responseJson.length/2);
        this.setState({
          hosts: responseJson,
          host: responseJson[middleHostIndex][1]
        });
      })
      .catch((error) => {
        console.warn(error)
      });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetForm === true) {
      this.setState({
        firstName: "",
        lastName: "",
        host: 0
      });
    }
  },

  render() {
    // View is like the html5 <main> element
    // PickerIOS is equivalent to the html <select> element
    // PickerItemIOS is equivalent to html <option> element
    return(
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({firstName: text})}
          value={this.state.firstName}
          autoCorrect={false}
          autoFocus={true}
          placeholder="First Name" />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({lastName: text})}
          value={this.state.lastName}
          autoCorrect={false}
          placeholder="Last Name" />

        <Text style={styles.instructions}>
          Who are you here to see?
        </Text>

        <PickerIOS
          style={styles.picker}
          selectedValue={this.state.host}
          onValueChange={(host) => this.setState({host: host})}>
          {this.state.hosts.map((host) => (
            <PickerItemIOS
              key={host[1]}
              value={host[1]}
              label={host[0]} />
            )
          )}
        </PickerIOS>

        <Button style={{color: 'green', padding: 10, borderWidth: 1}} onPress={this._handleChangePage}>
          Next
        </Button>
      </View>
    );
  }
});

// camelCase instead of dashes.
// eg. instead of margin-left, it's marginLeft.
var styles = StyleSheet.create({
  formContainer: {
    marginLeft: 30,
    marginRight: 30
  },
  picker: {
    padding: 0,
    margin: 0
  },
  instructions: {
    marginTop: 30,
    textAlign: 'center',
    color: '#333333'
  },
  textinput: {
    marginTop: 10,
    paddingLeft: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white'
  }
});

module.exports = Form;

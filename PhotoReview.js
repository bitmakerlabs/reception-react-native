'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

var BaseUrl = "https://recepti0n.herokuapp.com";

var Button = require('react-native-button');

var Form = require('./Form');

var PhotoReview = React.createClass({
  render() {
    return (
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <Image style={{flex: 1}} source={{uri: this.props.photo, isStatic: true}} />
        <Button style={{color: 'green', margin: 10}} onPress={this._submit}>
          Save
        </Button>
      </View>
    );
  },

  _submit() {
    fetch(BaseUrl + "/visits.json", {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        visit: {
          host_slack_id: this.props.host,
          visitor_attributes: {
            first_name: this.props.firstName,
            last_name: this.props.lastName,
            photo: this.props.photo
          }
        }
      })
    })
    .then((response) => {
      this.props.navigator.resetTo({
        title: "Fill out the fields below",
        component: Form,
        passProps: {
          resetForm: true
        }
      });
    });
  }
});

module.exports = PhotoReview;

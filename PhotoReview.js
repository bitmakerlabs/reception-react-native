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

var Button = require('react-native-button');

var Form = require('./Form');

var PhotoReview = React.createClass({
  statics: {
    title: 'Review your picture'
  },

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
    fetch(this.props.baseUrl + "/visits.json", {
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
      // this.props.navigator.popToTop();
      this.props.navigator.resetTo({
        title: Form.title,
        component: Form,
        passProps: {
          resetForm: true
        }
      });
    });
  }
});

module.exports = PhotoReview;

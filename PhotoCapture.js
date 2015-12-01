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
var Camera = require('react-native-camera');

var PhotoReview = require('./PhotoReview');

var PhotoCapture = React.createClass({
  _handleChangePage() {
    this.props.navigator.push({
      title: "Review your picture",
      component: PhotoReview,
      passProps: {
        photo: this.state.photo,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        host: this.props.host
      }
    });
  },

  getInitialState() {
    return {
      cameraType: Camera.constants.Type.front,
      captureTarget: Camera.constants.CaptureTarget.memory
    }
  },

  render() {

    return (
      <Camera
        ref="cam"
        style={styles.container}
        type={this.state.cameraType}
      >
        <Button style={{color: 'blue', margin: 10}} onPress={this._takePicture}>
          Take Picture
        </Button>

      </Camera>
    );
  },

  _takePicture() {
    var that = this;
    this.refs.cam.capture({ target: this.state.captureTarget }, function(err, data) {
      that.state.photo = "data:image/jpg;base64," + data;
      that._handleChangePage();
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});

module.exports = PhotoCapture;


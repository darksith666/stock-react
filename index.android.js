/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var HelloPage = require('./HelloPage');
import {
  AppRegistry,
	StyleSheet,
	Actions,
	Image,
  Text,
	View
} from 'react-native';
import Router from 'react-native-simple-router';


const firstRoute = {
  name: 'StockFolios',
  component: HelloPage,
};

class StockFolios extends Component {

	render() {
    return (
      <Router
        firstRoute={firstRoute}
        headerStyle={styles.header}
				handleBackAndroid={true}
				titleStyle = {styles.title}
				backButtonComponent = {backcomp }
      />
    );
  }
}

class backcomp extends Component {

	render() {
    return (
			<View>
				<Image 
				style={{width: 50, height: 50}}
				source={require('./arrow.png')}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
    backgroundColor: '#1a7ccc'
		
  },
	title: {
    textAlign: 'center'
		
  }
});

console.disableYellowBox = true;
AppRegistry.registerComponent('StockFolios', () => StockFolios);

import React from 'react';
var PortfolioPage = require('./PortfolioPage');
import {
	StyleSheet,
  Text,
	TouchableHighlight,
	View
} from 'react-native';

// The initial page
class HelloPage extends React.Component {

	onLocationPressed() {
		 this.props.toRoute({
      name: "Portfolios",
      component: PortfolioPage
    });
	}

  render() {
    return (
				<View style={styles.container}>
					<Text style={styles.description}>
						Welcome to StockFolios
					</Text>
					<Text style={styles.description}>
						This app has 3 screens.
					</Text>
					<TouchableHighlight style={styles.button}
							underlayColor='#99d9f4'
							onPress={this.onLocationPressed.bind(this)}
							>
						<Text style={styles.buttonText}>View Portfolios</Text>
					</TouchableHighlight>
				</View>
		);
  }

}

var styles = StyleSheet.create({
	description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#1a7ccc'
  },
  container: {
    padding: 30,
    marginTop: 65,
		//flex: 1,
    alignItems: 'center',
		justifyContent: 'center',
		width: null,
		height:null,
		backgroundColor: 'transparent'
  },
  flowRight: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  alignSelf: 'stretch'
	},
	buttonText: {
	  fontSize: 18,
	  color: 'white',
	  alignSelf: 'center'
	},
	button: {
	  height: 36,
	  flex: 1,
	  flexDirection: 'row',
	  backgroundColor: '#1a7ccc',
	  borderColor: '#1a7ccc',
	  borderWidth: 1,
	  borderRadius: 8,
	  marginBottom: 10,
	  alignSelf: 'stretch',
	  justifyContent: 'center'
	}
});

module.exports = HelloPage;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var customData = require('./Portfolios.json');
var StockListPage = require('./StockListPage');
import {
	ListView,
	ScrollView,
	TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';

class PortfolioPage extends Component {
	
	constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		
		var portfolioslist = []
		customData.folio.map(function(item) {
        var eachItem = item.name;   
				portfolioslist.push(eachItem);
    });
		
    this.state = {
      dataSource: ds.cloneWithRows(portfolioslist)
    };
  }
	
	rowPressed(selectedPortfolio) {
	  //console.log("PortfolioPage:- i have clicked:-" + selectedPortfolio);
		
		var stocklist = [];
		customData.folio.map(function(item) {
        if( item.name == selectedPortfolio)   
				{
					var compItem = item.components;        

					compItem.map(function(elem) {
							stocklist.push(elem);
					});
				}
	  });
		
		this.props.toRoute({
      name: selectedPortfolio,
      component: StockListPage,
			passProps: {stockarr : stocklist, prtfol : selectedPortfolio}
    }); 
	}
  
	renderRow(rowData) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)} 
          underlayColor='#dddddd'>
        <View>
					<View style={styles.rowContainer}>
						<View  style={styles.textContainer}>
							<Text style={styles.price}>{rowData}</Text>
						</View>
					</View>
					<View style={styles.separator}/>
        </View>
		  </TouchableHighlight>
    );
  }

  render() {
    return (
			<ScrollView ref="scrollView">
				<View style={styles.container}>
       
					<ListView
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
					/>
        
				</View>
			</ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1a7ccc'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

module.exports = PortfolioPage;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var customData = require('./Portfolios.json');
var StockDetailsPage = require('./StockDetailsPage');
import {
	ListView,
	TouchableHighlight,
  StyleSheet,
  Text,
	ScrollView,
  View
} from 'react-native';

class StockListPage extends Component {
	
	constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
      dataSource: ds.cloneWithRows(this.props.stockarr),
		};
  }
	
	rowPressed(selectedStock) {
	  //console.log("SecondLevel:- i m clicked:-" + selectedStock);
		var selectedPortfolio = this.props.prtfol;
		var stockDtlsObj;
		var stockCompName;
		
		customData.folio.map(function(item) {
        if( item.name == selectedPortfolio)   
				{
					var compItem = item.components;        

					compItem.map(function(elem) {
						if(elem.symbol == selectedStock)
						{
							stockDtlsObj = elem;
							stockCompName = elem.companyName;
						}
					});
				}
	  });
		
		
		this.props.toRoute({
      name: stockCompName,
      component: StockDetailsPage,
			passProps: {stockdtls : stockDtlsObj}
    }); 
	}
	
	renderRow(rowData) {
		return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.symbol)} 
          underlayColor='#dddddd'>
        <View>
					<View style={styles.rowContainer}>
						<View  style={styles.textContainer}>
							<Text style={styles.price}>{rowData.symbol}</Text>
							<Text style={styles.title}
                  numberOfLines={1}>{rowData.companyName}</Text>
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
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

module.exports = StockListPage;

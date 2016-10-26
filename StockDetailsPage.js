import React from 'react';
var customData = require('./Portfolios.json');
import {
	ScrollView,
	StyleSheet,
  Text,
	TouchableHighlight,
	View,
	Image
} from 'react-native';

// The initial page
class StockDetailsPage extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			stockdtls: this.props.stockdtls,
			currentdtlsobj : []
		};
	}

	getStock(opts: Object, type: string) : Object {
		var defs = {
			baseURL: 'http://query.yahooapis.com/v1/public/yql?q=',
			query: {
				quotes: 'select * from yahoo.finance.quotes where symbol in ("{stock}")',
				historicaldata: 'select * from yahoo.finance.historicaldata where symbol = "{stock}" and startDate = "{startDate}" and endDate = "{endDate}"',
			},
			suffixURL: {
				quotes: '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
				historicaldata: '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
			}
		};

		opts = opts || {};

		if (!opts.symbol) {
			console.log('No stock defined');
			return;
		}

		var query = defs.query[type]
			.replace('{stock}', opts.symbol)
			.replace('{startDate}', opts.startDate)
			.replace('{endDate}', opts.endDate);

			var url = defs.baseURL + query + (defs.suffixURL[type] || '');
		//console.log(url);
		return fetch(url);
	};
	
	componentDidMount(){

     this.getTheData(function(json){
					var dtlsObj = json.query.results.quote;
					//console.log(dtlsObj);
					this.setState({ currentdtlsobj: dtlsObj});
				}.bind(this));
	}
	 
	getTheData(callback)
	{
			var stock = this.state.stockdtls;
			this.getStock(stock, 'quotes')
				.then(response => response.json())
				.then(json => callback(json))
				.catch(error => console.log(error));
	}	
	 
	
	render() {
    return (
		<ScrollView ref="scrollView">
			<View style={styles.container} >
			
				<Text style={styles.title}>{this.state.currentdtlsobj.symbol} <Text style={styles.description}>({this.state.currentdtlsobj.StockExchange})</Text> 
				</Text>
				<View style={styles.separator}/>
				<Text style={styles.bid}>{this.state.currentdtlsobj.Bid} </Text>
				<Text style={styles.statistics}>Prev Close:</Text> 
				<Text style={styles.statistics}>{this.state.currentdtlsobj.PreviousClose} ({this.state.currentdtlsobj.ChangeinPercent})</Text> 
				<View style={styles.separator}/>
          <Image
            style={styles.image}
						resizeMode='contain'
            source={{uri: 'http://chart.finance.yahoo.com/z?s='+this.state.currentdtlsobj.symbol+'&t=7d&q=l&l=on&z=s' }}/>
						
					<Text style={styles.keytitle}>Key Statistics:</Text> 	
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex:0.5}} >
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>Prev Close  </Text>
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.PreviousClose}</Text>
							</View>
								<View style={styles.separator}/>
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>Low  </Text>
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.DaysLow}</Text>
							</View>
								<View style={styles.separator}/>
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>52wk Low  </Text>
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.YearLow}</Text>
							</View>
								<View style={styles.separator}/>
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>Mkt Cap  </Text>
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.MarketCapitalization}</Text>
							</View>
								<View style={styles.separator}/>
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>1Y Target  </Text>
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.OneyrTargetPrice}</Text>
							</View>
								<View style={styles.separator}/>
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>P/E  </Text>
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.PERatio}</Text>
							</View>
								<View style={styles.separator}/>
						</View>
						<View style={{flex:0.5}} >
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>Open</Text>
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.Open}</Text> 
							</View>
								<View style={styles.separator}/>
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>High</Text> 
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.DaysHigh}</Text>
							</View>
								<View style={styles.separator}/>
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>52wk High</Text> 
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.YearHigh}</Text>
							</View>
								<View style={styles.separator}/>
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>Volume</Text>
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.Volume}</Text> 
							</View>
								<View style={styles.separator}/>
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>Avg Vol</Text>
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.AverageDailyVolume}</Text> 
							</View>
								<View style={styles.separator}/>
							<View style={{flexDirection: 'row'}} >
								<Text style={styles.statisticsLeft}>Dividend</Text>
								<Text style={styles.statisticsRight}>{this.state.currentdtlsobj.DividendShare}</Text> 
							</View>
								<View style={styles.separator}/>
						</View>
				</View>	
					
		</View>
		</ScrollView>
	
  	);
  }

}

var styles = StyleSheet.create({
	description: {
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#656565'
  },
	statistics: {
		marginBottom: 5,
    fontSize: 14,
    textAlign: 'left',
    color: '#656565',
		marginLeft:10
	},
	statisticsLeft: {
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'left',
    color: '#656565',
		marginLeft:10,
		flexDirection: 'row',
    justifyContent: 'flex-start',
	},
	statisticsRight: {
		flex: 1,
    marginBottom: 5,
    fontSize: 14,
		fontWeight: 'bold',
    textAlign: 'right',
    color: '#656565',
		marginLeft:10,
		marginRight:10,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
  container: {
   flex: 1,
	 justifyContent: 'flex-start',
	 alignItems: 'flex-start',
  },
	title: {
    fontSize: 18,
		padding: 10,
    color: '#000000'
  },
	keytitle: {
    fontSize: 18,
		padding: 10,
    color: '#656565'
  },
	bid: {
    fontSize:60,
    color: '#000000',
		marginLeft: 10
  }
  ,image: {
		marginLeft:10,
		width: 320,
		height: 240
  }
	,separator: {
    height: 1,
		backgroundColor: '#D9D9D9',
		marginLeft: 10,
		marginRight: 10
  }
	
});

module.exports = StockDetailsPage;

import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import MovieList from '../UI/movieListView';

//Set up SQLlite package
let config = require('../assets/api/DatabaseConfig');

import auth from '@react-native-firebase/auth';
const user = auth().currentUser;

export default class Payment extends Component {
  static navigationOptions = {
    title: 'Order Summary',
    headerStyle: {
      backgroundColor: '#071e54',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      orderedItem: [],
      isFetching: false,
    };

    this._load = this._load.bind(this);
  }

  componentDidMount() {
    this._load();
  }

  _load() {
    let url = config.settings.serverPath + '/api/cart/user/' + user.uid;

    this.setState({isFetching: true});

    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(orderedItem => {
        this.setState({orderedItem});
        this.setState({isFetching: false});
        //console.log(orderedItem);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {navigate} = this.props.navigation;
    let subTotal = 0;
    let charge = 0;
    let totalPrice = 0;
    this.state.orderedItem.forEach(item => {
      subTotal = (Number(subTotal) + Number(5)).toFixed(2);
      charge = (Number(subTotal) * 0.06).toFixed(2);
      totalPrice = (Number(subTotal) + Number(charge)).toFixed(2);
    });

    return (
      <ScrollView style={styles.main}>
        {/*Ordered List*/}
        <FlatList
          data={this.state.orderedItem}
          showsVerticalScrollIndicator={true}
          refreshing={this.state.isFetching}
          onRefresh={this._load}
          renderItem={({item}) => (
            <View style={{flex: 1}}>
              <MovieList
                movieName={item[1]}
                movieType={item[2]}
                movieDuration={item[3] + ' min'}
                movieRating={item[4] + '/10'}
                movieImage={'https://image.tmdb.org/t/p/w200/' + item[5]}
                moviePrice={'RM 5.00'}
              />
            </View>
          )}
          keyExtractor={(item, index) => {
            index.toString();
          }}
        />

        {/*Payment method*/}
        <Text style={styles.label}>Payment Method</Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/img/payment.png')}
            style={styles.paymentOption}
          />
          <Text style={styles.label1}>Credit / Debit Card</Text>
        </View>

        {/*Total Payment*/}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.payLabel1}>Sub Total</Text>
          <TextInput
            style={styles.priceValue1}
            value={subTotal.toString()}
            editable={false}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#5A5A5A',
          }}>
          <Text style={styles.payLabel1}>Service charge (6%)</Text>
          <TextInput
            style={styles.priceValue1}
            value={charge.toString()}
            editable={false}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.payLabel2}>Total Payment: </Text>
          <Text style={styles.RMLabel}>RM</Text>
          <TextInput
            style={styles.priceValue2}
            value={totalPrice.toString()}
            editable={false}
          />
          <TouchableNativeFeedback
            onPress={() =>
              this.props.navigation.navigate('CreditCard', {
                subTotal: subTotal,
                charge: charge,
                totalPrice: totalPrice,
              })
            }
            background={
              // eslint-disable-next-line no-undef
              Platform.OS === 'android'
                ? TouchableNativeFeedback.SelectableBackground()
                : ''
            }>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#d8e9f7',
  },
  paymentOption: {
    margin: 20,
    width: 30,
    height: 30,
  },
  label: {
    paddingTop: 10,
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  label1: {
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  payLabel1: {
    paddingBottom: 20,
    paddingLeft: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  payLabel2: {
    paddingTop: 20,
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E11818',
  },
  RMLabel: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceValue1: {
    flex: 1,
    paddingTop: 0,
    paddingRight: 20,
    textAlign: 'right',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#080809',
  },
  priceValue2: {
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#080809',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(5, 90, 239, 0.7)',
  },
  buttonText: {
    textAlign: 'center',
    color: '#F4F8FE',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

import React, {Component, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  TouchableNativeFeedback,
  Platform,
  Alert,
} from 'react-native';
import {InputWithLabel} from '../UI/InputWithLabel';

//Set up SQLlite package
let config = require('../assets/api/DatabaseConfig');

import auth from '@react-native-firebase/auth';
const user = auth().currentUser;

function GetUserName(props) {
  return <Text style={styles.userValue}>{user.displayName}</Text>;
}

export default class Invoice extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Invoice',
      headerStyle: {
        backgroundColor: '#071e54',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  constructor(props) {
    let day = new Date().getDate(); //current Date
    let month = new Date().getMonth() + 1; //current Month
    let year = new Date().getFullYear(); //current Year
    let date = day + '/' + month + '/' + year + ' ';

    super(props);
    this.state = {
      orderedItem: [],
      currentDate: date,
      currentTime: new Date().toLocaleTimeString('it-IT'),
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
        //console.log(user.uid);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //retrieve things from library to get userID and movieID, store in item

  storeToLibrary() {
    let url =
      config.settings.serverPath + '/api/cart/retrieve/user/' + user.uid;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(retrievedCart => {
        this.setState({retrievedCart});
        this.setState({isFetching: false});
        this.storeLibrary(retrievedCart);
      })
      .catch(error => {
        console.log(error);
      });
  }

  storeLibrary(retrievedCart) {
    console.log(retrievedCart);
    console.log('Length: ' + retrievedCart.length);

    let cartUrl = config.settings.serverPath + '/api/library/storeCart/user';

    for (var i = 0; i < retrievedCart.length; i++) {
      var movieID = retrievedCart[i][1];
      console.log('movieID: ' + movieID);

      fetch(cartUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: user.uid,
          movieID: movieID,
        }),
      })
        .then(response => {
          if (!response.ok) {
            Alert.alert('Error', response.status.toString());
            throw Error('Error ' + response.status);
          }

          return response.json();
        })
        .then(responseJson => {
          if (responseJson.affected > 0) {
            console.log('Added' + retrievedCart[i][1] + 'to the database');
          } else {
            console.log('Error saving library record: ' + retrievedCart[i][1]);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    this.deleteItemInCart();
  }

  deleteItemInCart() {
    let url = config.settings.serverPath + '/api/cart/deleteall/' + user.uid;

    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: user.uid,
      }),
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(responseJson => {
        if (responseJson.affected == 0) {
          console.log('All item cannot be removed from Cart');
        }
        console.log('Sucessfully removed from your cart');
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const {navigation} = this.props;
    let num = 1;
    this.state.orderedItem.forEach(item => {
      num = Number(num) - 1;
    });

    return (
      <ScrollView>
        {/*Header*/}
        <View style={styles.invoiceContainer}>
          <Text style={styles.title}>MCOHub</Text>
          <Text style={styles.address}>
            Address:{'\n'}1912 Harvest Lane{'\n'} New York, NY 12210
          </Text>
        </View>

        {/*Personal details*/}
        <ScrollView style={styles.detailsView}>
          <View flexDirection="row">
            <Text style={styles.billing}>BILL TO</Text>
            <GetUserName />
          </View>
          <InputWithLabel
            style={styles.value}
            label={'INVOICE #'}
            value={'INV 001'}
            orientation={'horizontal'}
            editable={false}
          />
          <InputWithLabel
            style={styles.value}
            label={'DATE'}
            value={this.state.currentDate}
            orientation={'horizontal'}
            editable={false}
          />
          <InputWithLabel
            style={styles.value}
            label={'TIME'}
            value={this.state.currentTime}
            orientation={'horizontal'}
            editable={false}
          />
        </ScrollView>

        {/*Description details*/}
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionLabel1}>Items</Text>
          <Text style={styles.descriptionLabel2}>Description</Text>
          <Text style={styles.descriptionLabel3}>Amount</Text>
        </View>
        <ScrollView style={styles.descriptionContainer}>
          <FlatList
            data={this.state.orderedItem}
            showsVerticalScrollIndicator={true}
            refreshing={this.state.isFetching}
            onRefresh={this._load}
            renderItem={({item}) => (
              <View style={styles.descriptionDetailsView}>
                <Text style={styles.value1}>{num++}</Text>
                <Text style={styles.value2}>{item[1]}</Text>
                <Text style={styles.value3}>RM 5.00</Text>
              </View>
            )}
            keyExtractor={(item, index) => {
              index.toString();
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.payLabel1}>Sub Total</Text>
            <TextInput
              style={styles.priceValue1}
              value={navigation.getParam('subTotal')}
              editable={false}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.payLabel1}>Service charge</Text>
            <TextInput
              style={styles.priceValue1}
              value={navigation.getParam('charge')}
              editable={false}
            />
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.payLabel2}>Total : </Text>
            <Text style={styles.RMLabel}>RM</Text>
            <TextInput
              style={styles.priceValue2}
              value={navigation.getParam('totalPrice')}
              editable={false}
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableNativeFeedback
              onPress={() => this.storeToLibrary()}
              background={
                Platform.OS === 'android'
                  ? TouchableNativeFeedback.SelectableBackground()
                  : ''
              }>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Back to Home</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  invoiceContainer: {
    flexDirection: 'row',
    width: 1000,
    height: 100,
    backgroundColor: 'rgba(5, 90, 239, 0.7)',
  },
  title: {
    paddingLeft: 20,
    paddingTop: 27,
    color: '#F4F8FE',
    fontSize: 30,
    fontWeight: 'bold',
  },
  address: {
    paddingTop: 20,
    paddingLeft: 100,
    textAlign: 'right',
    color: '#F4F8FE',
    fontSize: 15,
  },
  detailsView: {
    paddingLeft: 20,
    textAlign: 'left',
    fontSize: 15,
    width: 600,
  },
  billing: {
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
    fontSize: 18,
  },
  userValue: {
    marginLeft: 75,
    padding: 3,
    color: 'rgba(5, 90, 239, 0.7)',
    width: 150,
    fontSize: 18,
  },
  value: {
    padding: 3,
    color: 'rgba(5, 90, 239, 0.7)',
    width: 100,
    fontSize: 18,
  },
  value1: {
    width: 70,
    padding: 7,
    textAlign: 'center',
    fontSize: 15,
    color: '#565859',
  },
  value2: {
    width: 230,
    padding: 6,
    textAlign: 'left',
    fontSize: 15,
    color: '#565859',
  },
  value3: {
    paddingTop: 7,
    paddingLeft: 27,
    textAlign: 'right',
    fontSize: 15,
    color: '#565859',
  },
  descriptionView: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: 'rgba(5, 90, 239, 0.7)',
  },
  descriptionLabel1: {
    width: 70,
    padding: 7,
    textAlign: 'left',
    fontSize: 20,
  },
  descriptionLabel2: {
    width: 230,
    padding: 7,
    textAlign: 'left',
    fontSize: 20,
  },
  descriptionLabel3: {
    padding: 7,
    textAlign: 'left',
    fontSize: 20,
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: '#d8e9f7',
  },
  descriptionDetailsView: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#9c9c9c',
  },
  priceContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(5, 90, 239, 0.7)',
    height: 50,
    width: 250,
    alignSelf: 'flex-end',
  },
  payLabel1: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 180,
    fontSize: 15,
    fontWeight: 'bold',
  },
  payLabel2: {
    paddingTop: 11,
    paddingLeft: 37,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E11818',
  },
  RMLabel: {
    paddingTop: 11,
    paddingLeft: 58,
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceValue1: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 10,
    textAlign: 'right',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#080809',
  },
  priceValue2: {
    paddingTop: 9,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#080809',
  },
  buttonView: {
    flexDirection: 'row',
    margin: 10,
    marginLeft: 120,
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 170,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#6495ED',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#F4F8FE',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

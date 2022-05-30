import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';

/**
 *
 * MasterCard: 5365 6499 1695 6529
 *
 * Visa: 4568 7536 5425 7963
 *
 */
export default class CreditCard extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Credit / Debit Card Payment',
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
    super(props);
    this.state = {
      buttonStateHolder: false,
      subTotal: this.props.navigation.state.params.subTotal,
      charge: this.props.navigation.state.params.charge,
      totalPrice: this.props.navigation.state.params.totalPrice,
    };
  }

  _onChange = formData => console.log(JSON.stringify(formData, null, ' '));
  _onFocus = field => console.log('focusing', field);

  render() {
    return (
      <View style={styles.container}>
        <CreditCardInput
          style={styles.card}
          requiresName
          requiresCVC
          labelStyle={styles.label}
          inputStyle={styles.input}
          validColor={'black'}
          invalidColor={'red'}
          placeholderColor={'gray'}
          onFocus={this._onFocus}
          onChange={this._onChange}
        />
        <TouchableNativeFeedback
          onPress={() =>
            this.props.navigation.navigate(
              'Invoice',
              {
                subTotal: this.state.subTotal,
                charge: this.state.charge,
                totalPrice: this.state.totalPrice,
              },
              Alert.alert('Paid Successful ;)'),
            )
          }
          background={
            Platform.OS === 'android'
              ? TouchableNativeFeedback.SelectableBackground()
              : ''
          }>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Go Pay RM {this.state.totalPrice}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8e9f7',
    paddingTop: 60,
  },
  card: {
    flexShrink: 1,
  },
  label: {
    marginTop: 5,
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    flexDirection: 'row',
    borderRadius: 30,
    marginTop: 50,
    marginLeft: 80,
    width: 250,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38ACEC',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 24,
    marginRight: 5,
  },
});

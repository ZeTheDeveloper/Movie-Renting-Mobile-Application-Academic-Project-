import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PaymentScreen from '../screens/Payment';
import CreditCardScreen from '../screens/CreditCard';
import InvoiceScreen from '../screens/Invoice';

const stackContainer = createStackNavigator(
  {
    Payment: {
      screen: PaymentScreen,
    },
    CreditCard: {
      screen: CreditCardScreen,
    },
    Invoice: {
      screen: InvoiceScreen,
    },
  },
  {
    initialRouteName: 'Payment',
  },
);

export default createAppContainer(stackContainer);

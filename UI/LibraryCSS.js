import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  //Library CSS
  filterContainer: {
    flex: 1,
    backgroundColor: '#d8e9f7',
  },
  header: {
    textAlign: 'center',
    fontSize: 35,
    left: 30,
  },
  headerImage: {
    marginRight: 345,
    width: 25,
    height: 25,
  },
  filterText: {
    fontWeight: 'bold',
    fontFamily: 'Octiva',
    color: '#ffffff',
  },
  btnSearch: {
    backgroundColor: '#00c0fb',
    borderRadius: 8,
    padding: 10,
    width: 70,
    left: 20,
    height: 40,
  },
  textSearch: {
    width: windowWidth - 20,
    left: 10,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#95c3e9',
  },
  line: {
    flex: 1,
    borderTopColor: '#9c9c9c',
    borderTopWidth: 4,
  },
  containerRow: {
    flexDirection: 'row',
  },

  //cart
  btnDelete: {
    backgroundColor: '#FF6666',
    borderRadius: 44 / 2,
    paddingHorizontal: 15,
    width: 40,
  },
  textDel: {
    fontWeight: 'bold',
    fontSize: 30,
    width: 10,
  },
  btnContainer: {
    paddingHorizontal: 10,
    alignSelf: 'center',
  },

  btnContainerPayment: {
    bottom: 70,
  },

  btnPayment: {
    backgroundColor: '#E9585E',
    borderRadius: 60 / 2,
    padding: 10,
    width: 250,
    height: 60,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: -70,
  },
});

export default styles;

import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1},
  imageWrapper: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: 'white',
    margin: 16,
    color: 'black',
    elevation: 5,
  },
});

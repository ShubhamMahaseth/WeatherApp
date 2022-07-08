import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';

const App = () => {
  const [change, setChange] = useState(null);
  const [dataWeather, setData] = useState([]);
  const [indicator, setIndicator] = useState(false);
  const api = {
    baseUrl:
      'https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=',
    key: '2819e53c1fac69523ea356741003e23b',
  };
  console.log(change);
  const enter = useCallback(() => {
    setChange('');
    setIndicator(true);
    Axios({
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${change}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        setData(res);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIndicator(false);
      });
  }, [api.key, change]);
  const image = {uri: 'https://www.fnordware.com/superpng/pnggrad16rgb.png'};
  console.log(dataWeather.data);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.imageWrapper}>
        <TextInput
          placeholder="Enter city name"
          onChangeText={text => {
            setChange(text);
          }}
          value={change}
          autoFocus={true}
          placeholderTextColor="grey"
          style={styles.textWrapper}
          textAlign={'left'}
          selectionColor={'grey'}
          onEndEditing={enter}
        />
        {indicator ? <ActivityIndicator size="large" color="white" /> : null}
        {dataWeather ? (
          <View>
            <Text>{dataWeather.data ? dataWeather.data.name : null}</Text>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  imageWrapper: {flex: 1},
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

export default App;

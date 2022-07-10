import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import moment from 'moment';
import Axios from 'axios';

const Screen = () => {
  const [change, setChange] = useState(null);
  const [dataWeather, setData] = useState([]);
  const [indicator, setIndicator] = useState(false);
  const api = {
    baseUrl:
      'https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=',
    key: '2819e53c1fac69523ea356741003e23b',
  };

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

  const weatherImage = function () {
    if (dataWeather.data?.weather[0].main == 'Clouds') {
      return require('../../../assets/sunny.jpg');
    } else if (dataWeather.data?.weather[0].main == 'Haze') {
      return require('../../../assets/cloudy.jpeg');
    } else if (dataWeather.data?.weather[0].main == 'Rain') {
      return require('../../../assets/rainy.jpg');
    } else if (dataWeather.data?.weather[0].main == 'Clear') {
      return require('../../../assets/sunny.jpg');
    } else if (dataWeather.data?.weather[0].main == 'scattered clouds') {
      return require('../../../assets/scatterd.jpg');
    } else {
      return require('../../../assets/bg3.jpeg');
    }
  };

  console.log(dataWeather.data?.weather[0].main);
  console.log('--------', moment(new Date()).format('hh:mm:ss'));
  return (
    <View style={styles.container}>
      <ImageBackground
        source={weatherImage()}
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

export default Screen;

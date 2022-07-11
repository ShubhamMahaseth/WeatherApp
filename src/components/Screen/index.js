import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import moment from 'moment';
import Cloudy from '../../../assets/cloudy.svg';
import Menu from '../../../assets/menu.svg';
import Moon from '../../../assets/moon.svg';
import Rain from '../../../assets/rain.svg';
import Search from '../../../assets/search.svg';
import Sun from '../../../assets/sun.svg';
import Axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

const Screen = () => {
  const [change, setChange] = useState(null);
  const [dataWeather, setData] = useState([]);
  const [indicator, setIndicator] = useState(false);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
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

  Geolocation.getCurrentPosition(info => setLat(info.coords.latitude)),
    Geolocation.getCurrentPosition(info => setLon(info.coords.longitude));

  useEffect(() => {
    setIndicator(true);
    Axios({
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api.key}`,
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
  }, [lon]);

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

  const svgIcon = function () {
    if (dataWeather.data?.weather[0].main == 'Clouds') {
      return <Cloudy height={30} width={30} fill="#fff" />;
    } else if (dataWeather.data?.weather[0].main == 'Haze') {
      return <Rain height={30} width={30} fill="#fff" />;
    } else if (dataWeather.data?.weather[0].main == 'Rain') {
      return <Rain height={30} width={30} fill="#fff" />;
    } else if (dataWeather.data?.weather[0].main == 'Clear') {
      return <Sun height={30} width={30} fill="#fff" />;
    } else if (dataWeather.data?.weather[0].main == 'scattered clouds') {
      return <Sun height={30} width={30} fill="#fff" />;
    } else {
      return <Cloudy height={30} width={30} fill="#fff" />;
    }
  };
  let weatherTime = moment(new Date()).format('h:mm A - dddd, DD MMMM yyyy');
  let wind = (dataWeather.data?.wind?.speed * 3).toFixed(2);
  console.log(dataWeather.data);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={weatherImage()}
        resizeMode="cover"
        style={styles.imageWrapper}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
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
          {dataWeather.data ? (
            <>
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 35,
                    marginLeft: 20,
                    marginTop: 130,
                  }}>
                  {dataWeather.data ? dataWeather.data.name : null}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    marginLeft: 20,
                    //   marginTop: 220,
                  }}>
                  {dataWeather.data ? weatherTime : null}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 70,
                    marginLeft: 20,
                    marginTop: 320,
                    fontFamily: 'Lato-Light',
                  }}>
                  {dataWeather.data ? dataWeather?.data?.main?.temp : null}{' '}
                  <Text style={{fontFamily: 'Lato-Regular'}}>ºC</Text>
                </Text>
                <View
                  style={{flexDirection: 'row', marginLeft: 26, marginTop: 8}}>
                  {svgIcon()}
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      marginLeft: 8,
                      // marginTop: 10,
                    }}>
                    {dataWeather.data
                      ? dataWeather.data?.weather[0].main
                      : null}
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(255,255,255,0.7)',

                    margin: 15,
                  }}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 15,
                    marginRight: 15,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 18, color: 'white', marginTop: 4}}>
                      Wind
                    </Text>
                    <Text style={{fontSize: 22, color: 'white'}}>
                      {wind} kmph
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 18, color: 'white', marginTop: 4}}>
                      Rain
                    </Text>
                    <Text style={{fontSize: 22, color: 'white'}}>65%</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 18, color: 'white', marginTop: 4}}>
                      Humidity
                    </Text>
                    <Text style={{fontSize: 22, color: 'white'}}>40%</Text>
                  </View>
                </View>
              </View>
            </>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Screen;

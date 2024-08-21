import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Button,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import {getWeatherImage} from './src/helpers/getWeatherImage';

interface WeatherData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

interface Coordinates {
  lat: number;
  lon: number;
}

const App = () => {
  const [location, setLocation] = useState<string>('New Delhi');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [timezone, setTimezone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getCoordinates = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`,
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const {latitude, longitude} = data.results[0];
        setCoordinates({lat: latitude, lon: longitude});
      } else {
        Alert.alert('Error', 'Location not found.');
      }
    } catch (err) {
      Alert.alert('Error', 'Unable to fetch location data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`,
      );
      const data = await response.json();
      setTimezone(data.timezone);
      setWeather(data.daily);
    } catch (err) {
      Alert.alert('Error', 'Unable to fetch weather data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderWeeklyItem = ({item}: {item: any; index: number}) => {
    let weathercodeData = getWeatherImage(item.weathercode);

    return (
      <View style={styles.block}>
        <View>
          <Text>Date: {item.time}</Text>
          <Text>Max Temp: {item.temperature_2m_max}°C</Text>
          <Text>Min Temp: {item.temperature_2m_min}°C</Text>
        </View>
        <Image
          source={{
            uri: weathercodeData[new Date().getHours() > 6 ? 'day' : 'night']
              .image,
          }}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
    );
  };

  const searchLocationWeatherWeekly = () => {
    if (location) {
      getCoordinates();
    }
  };

  useEffect(() => {
    searchLocationWeatherWeekly();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherData(coordinates.lat, coordinates.lon);
    }
  }, [coordinates]);

  // Calculate average temperature
  const calculateAverageTemperature = () => {
    if (!weather) {
      return 0;
    }
    const allTemps = [
      ...weather.temperature_2m_max,
      ...weather.temperature_2m_min,
    ];
    const sum = allTemps.reduce((acc, temp) => acc + temp, 0);
    const avg = sum / allTemps.length;
    return Math.ceil(avg);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <TextInput
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
          style={styles.txtInput}
        />
        <Button title="Search" onPress={searchLocationWeatherWeekly} />
        <Text style={styles.heading}>Current timezone: {timezone}</Text>
        {weather && (
          <>
            <Text style={styles.avgTemp}>
              Average Temperature: {calculateAverageTemperature()}°C
            </Text>
            <FlatList
              data={weather.time.map((time, index) => ({
                time,
                temperature_2m_max: weather.temperature_2m_max[index],
                temperature_2m_min: weather.temperature_2m_min[index],
                weathercode: weather.weathercode[index],
              }))}
              renderItem={renderWeeklyItem}
              keyExtractor={item => item.time}
              style={styles.list}
              scrollEnabled
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: '#e1e1e1',
    padding: 10,
  },
  block: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  txtInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 20,
    alignSelf: 'center',
  },
  list: {
    flex: 1,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  avgTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  img: {width: 100, height: 100},
});

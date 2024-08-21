import {getWeatherImage, WeatherCode} from '../getWeatherImage';

describe('getWeatherImage', () => {
  // Test case for known weather codes
  test.each([
    [
      '0',
      'Sunny',
      'http://openweathermap.org/img/wn/01d@2x.png',
      'Clear',
      'http://openweathermap.org/img/wn/01n@2x.png',
    ],
    [
      '1',
      'Mainly Sunny',
      'http://openweathermap.org/img/wn/01d@2x.png',
      'Mainly Clear',
      'http://openweathermap.org/img/wn/01n@2x.png',
    ],
    [
      '2',
      'Partly Cloudy',
      'http://openweathermap.org/img/wn/02d@2x.png',
      'Partly Cloudy',
      'http://openweathermap.org/img/wn/02n@2x.png',
    ],
    [
      '45',
      'Foggy',
      'http://openweathermap.org/img/wn/50d@2x.png',
      'Foggy',
      'http://openweathermap.org/img/wn/50n@2x.png',
    ],
    // Add more known weather codes here...
  ])(
    'returns the correct image for weather code %s',
    (
      weatherCode,
      expectedDayDescription,
      expectedDayImage,
      expectedNightDescription,
      expectedNightImage,
    ) => {
      const result = getWeatherImage(weatherCode);
      expect(result.day.description).toBe(expectedDayDescription);
      expect(result.day.image).toBe(expectedDayImage);
      expect(result.night.description).toBe(expectedNightDescription);
      expect(result.night.image).toBe(expectedNightImage);
    },
  );

  // Test case for unknown weather codes
  test('returns default images for unknown weather codes', () => {
    const unknownCode = '999' as WeatherCode;
    const result = getWeatherImage(unknownCode);

    expect(result.day.description).toBe('Default');
    expect(result.day.image).toBe(
      'http://openweathermap.org/img/wn/default-day@2x.png',
    );
    expect(result.night.description).toBe('Default');
    expect(result.night.image).toBe(
      'http://openweathermap.org/img/wn/default-night@2x.png',
    );
  });
});

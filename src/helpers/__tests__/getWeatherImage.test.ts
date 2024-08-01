import getWeatherImage from '../getWeatherImage';

test.each([
  {weatherCode: '0', image: 'http://openweathermap.org/img/wn/01d@2x.png'},
  {weatherCode: '1', image: 'http://openweathermap.org/img/wn/01d@2x.png'},
  {weatherCode: '2', image: 'http://openweathermap.org/img/wn/02d@2x.png'},
  {weatherCode: '3', image: 'http://openweathermap.org/img/wn/03d@2x.png'},
  {weatherCode: '45', image: 'http://openweathermap.org/img/wn/50d@2x.png'},
  {weatherCode: '48', image: 'http://openweathermap.org/img/wn/50d@2x.png'},
  {weatherCode: '51', image: 'http://openweathermap.org/img/wn/09d@2x.png'},
  {weatherCode: '53', image: 'http://openweathermap.org/img/wn/09d@2x.png'},
  {weatherCode: '55', image: 'http://openweathermap.org/img/wn/09d@2x.png'},
  {weatherCode: '56', image: 'http://openweathermap.org/img/wn/09d@2x.png'},
  {weatherCode: '57', image: 'http://openweathermap.org/img/wn/09d@2x.png'},
  {weatherCode: '61', image: 'http://openweathermap.org/img/wn/10d@2x.png'},
  {weatherCode: '63', image: 'http://openweathermap.org/img/wn/10d@2x.png'},
  {weatherCode: '65', image: 'http://openweathermap.org/img/wn/10d@2x.png'},
  {weatherCode: '66', image: 'http://openweathermap.org/img/wn/10d@2x.png'},
  {weatherCode: '67', image: 'http://openweathermap.org/img/wn/10d@2x.png'},
  {weatherCode: '71', image: 'http://openweathermap.org/img/wn/13d@2x.png'},
  {weatherCode: '73', image: 'http://openweathermap.org/img/wn/13d@2x.png'},
  {weatherCode: '75', image: 'http://openweathermap.org/img/wn/13d@2x.png'},
  {weatherCode: '77', image: 'http://openweathermap.org/img/wn/13d@2x.png'},
  {weatherCode: '80', image: 'http://openweathermap.org/img/wn/09d@2x.png'},
  {weatherCode: '81', image: 'http://openweathermap.org/img/wn/09d@2x.png'},
  {weatherCode: '82', image: 'http://openweathermap.org/img/wn/09d@2x.png'},
  {weatherCode: '85', image: 'http://openweathermap.org/img/wn/13d@2x.png'},
  {weatherCode: '86', image: 'http://openweathermap.org/img/wn/13d@2x.png'},
  {weatherCode: '95', image: 'http://openweathermap.org/img/wn/11d@2x.png'},
  {weatherCode: '96', image: 'http://openweathermap.org/img/wn/11d@2x.png'},
  {weatherCode: '99', image: 'http://openweathermap.org/img/wn/11d@2x.png'},
])(
  'should render the correct image for weather code: $weatherCode',
  ({weatherCode, image}) => {
    expect(getWeatherImage(weatherCode)).toEqual(image);
  },
);

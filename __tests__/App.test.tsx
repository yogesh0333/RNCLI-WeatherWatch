import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import App from '../App'; // Adjust the path to your App component

// Mock the getWeatherImage function
jest.mock('../src/helpers/getWeatherImage', () => ({
  getWeatherImage: jest.fn(() => ({
    day: {image: 'http://example.com/day.png'},
    night: {image: 'http://example.com/night.png'},
  })),
}));

describe('App Component', () => {
  it('renders FlatList with weather data', async () => {
    // Mock fetch responses
    const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(url => {
      if (url.includes('geocoding-api')) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({results: [{latitude: 12.34, longitude: 56.78}]}),
        });
      } else if (url.includes('open-meteo')) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              timezone: 'Asia/Kolkata',
              daily: {
                time: ['2024-08-21', '2024-08-22'],
                temperature_2m_max: [30, 32],
                temperature_2m_min: [25, 27],
                weathercode: [1, 2],
              },
            }),
        });
      }
      return Promise.reject('Unknown URL');
    });

    // Render the App component
    render(<App />);

    // Wait for the FlatList to be populated with data
    await waitFor(() => {
      // Check if the FlatList items are rendered
      expect(screen.getByText('Date: 2024-08-21')).toBeTruthy();
      expect(screen.getByText('Max Temp: 30°C')).toBeTruthy();
      expect(screen.getByText('Min Temp: 25°C')).toBeTruthy();
      expect(screen.getByText('Date: 2024-08-22')).toBeTruthy();
      expect(screen.getByText('Max Temp: 32°C')).toBeTruthy();
      expect(screen.getByText('Min Temp: 27°C')).toBeTruthy();
    });

    // Clean up mock
    mockFetch.mockRestore();
  });
});

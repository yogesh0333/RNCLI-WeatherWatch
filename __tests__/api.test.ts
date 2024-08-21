describe('API Requests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  test('fetches weather data successfully', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({
        timezone: 'Europe/Berlin',
        daily: {
          time: ['2024-08-21'],
          temperature_2m_max: [25],
          temperature_2m_min: [15],
          weathercode: [1], // Note: Use number for consistency with expected data type
        },
      }),
    };

    global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as jest.Mock;

    const lat = 52.52;
    const lon = 13.41;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`,
    );

    const data = await response.json();
    expect(data.timezone).toBe('Europe/Berlin');
    expect(data.daily.temperature_2m_max).toEqual([25]);
  });

  test('handles API error', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Error')),
    ) as jest.Mock;

    // Make sure to use `await` with `.rejects`
    await expect(
      fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto',
      ),
    ).rejects.toThrow('Error');
  });
});

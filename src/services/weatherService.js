// Weather Service for real-time weather data
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo_key';
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  async getCurrentWeather(lat, lon) {
    try {
      if (WEATHER_API_KEY === 'demo_key') {
        // Return demo weather data if no API key
        return this.getDemoWeatherData(lat, lon);
      }

      const response = await fetch(
        `${WEATHER_API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather API request failed');
      }
      
      const data = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
        location: data.name,
        country: data.sys.country,
        icon: data.weather[0].icon,
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000),
        feelsLike: Math.round(data.main.feels_like),
        cloudiness: data.clouds.all
      };
    } catch (error) {
      console.error('Weather service error:', error);
      return this.getDemoWeatherData(lat, lon);
    }
  }

  async getWeatherForecast(lat, lon, days = 5) {
    try {
      if (WEATHER_API_KEY === 'demo_key') {
        return this.getDemoForecastData();
      }

      const response = await fetch(
        `${WEATHER_API_BASE}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&cnt=${days * 8}`
      );
      
      if (!response.ok) {
        throw new Error('Forecast API request failed');
      }
      
      const data = await response.json();
      
      // Group by days and take one forecast per day (noon time)
      const dailyForecasts = [];
      const processedDays = new Set();
      
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        if (!processedDays.has(dayKey) && date.getHours() >= 12) {
          processedDays.add(dayKey);
          dailyForecasts.push({
            date: date,
            temperature: Math.round(item.main.temp),
            humidity: item.main.humidity,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            windSpeed: item.wind.speed,
            precipitation: item.rain ? item.rain['3h'] || 0 : 0
          });
        }
      });
      
      return dailyForecasts.slice(0, days);
    } catch (error) {
      console.error('Forecast service error:', error);
      return this.getDemoForecastData();
    }
  }

  getDemoWeatherData(lat, lon) {
    // Demo weather data based on typical Indian farming regions
    const locations = [
      { name: 'मध्य प्रदेश', temp: 28, humidity: 65 },
      { name: 'पंजाब', temp: 25, humidity: 70 },
      { name: 'उत्तर प्रदेश', temp: 30, humidity: 60 },
      { name: 'महाराष्ट्र', temp: 32, humidity: 55 }
    ];
    
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    
    return {
      temperature: randomLocation.temp,
      humidity: randomLocation.humidity,
      description: 'partly cloudy',
      windSpeed: 8.5,
      pressure: 1013,
      visibility: 10,
      location: randomLocation.name,
      country: 'IN',
      icon: '02d',
      sunrise: new Date(),
      sunset: new Date(),
      feelsLike: randomLocation.temp + 2,
      cloudiness: 25
    };
  }

  getDemoForecastData() {
    const today = new Date();
    const forecasts = [];
    
    for (let i = 1; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      forecasts.push({
        date: date,
        temperature: 25 + Math.floor(Math.random() * 10),
        humidity: 55 + Math.floor(Math.random() * 20),
        description: ['sunny', 'partly cloudy', 'cloudy', 'light rain'][Math.floor(Math.random() * 4)],
        icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
        windSpeed: 5 + Math.random() * 10,
        precipitation: Math.random() * 5
      });
    }
    
    return forecasts;
  }

  async getLocationWeather(locationName) {
    try {
      if (WEATHER_API_KEY === 'demo_key') {
        return this.getDemoWeatherData(0, 0);
      }

      const response = await fetch(
        `${WEATHER_API_BASE}/weather?q=${locationName}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Location weather request failed');
      }
      
      const data = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        location: data.name,
        country: data.sys.country,
        coordinates: {
          lat: data.coord.lat,
          lon: data.coord.lon
        }
      };
    } catch (error) {
      console.error('Location weather error:', error);
      return this.getDemoWeatherData(0, 0);
    }
  }

  // Get weather-based farming recommendations
  getFarmingRecommendations(weatherData, language = 'hindi') {
    const recommendations = {
      hindi: {
        hot: ['छायादार स्थान पर काम करें', 'पानी की मात्रा बढ़ाएं', 'दोपहर में काम से बचें'],
        cold: ['पाला से बचाव करें', 'गर्म कपड़े पहनें', 'सुबह देर से काम शुरू करें'],
        rainy: ['जल निकासी की व्यवस्था करें', 'फंगल रोगों से बचाव करें', 'खेत में पानी न जमने दें'],
        normal: ['नियमित सिंचाई करें', 'मिट्टी की नमी बनाए रखें', 'कीट-पतंगों पर नजर रखें']
      },
      english: {
        hot: ['Work in shaded areas', 'Increase water supply', 'Avoid midday work'],
        cold: ['Protect from frost', 'Wear warm clothes', 'Start work later in morning'],
        rainy: ['Ensure proper drainage', 'Prevent fungal diseases', 'Avoid waterlogging'],
        normal: ['Regular irrigation', 'Maintain soil moisture', 'Monitor pests']
      },
      marathi: {
        hot: ['सावलीत काम करा', 'पाण्याचे प्रमाण वाढवा', 'दुपारी काम टाळा'],
        cold: ['दंवापासून संरक्षण करा', 'उबदार कपडे घाला', 'सकाळी उशिरा काम सुरू करा'],
        rainy: ['पाणी निचरा व्यवस्था करा', 'बुरशीजन्य रोगांपासून बचाव करा', 'शेतात पाणी साचू देऊ नका'],
        normal: ['नियमित पाणी पुरवठा करा', 'मातीची ओलावा राखा', 'कीटकांवर लक्ष ठेवा']
      },
      gujarati: {
        hot: ['છાયામાં કામ કરો', 'પાણીનું પ્રમાણ વધારો', 'બપોરે કામ ટાળો'],
        cold: ['હિમથી બચાવ કરો', 'ગરમ કપડાં પહેરો', 'સવારે મોડું કામ શરૂ કરો'],
        rainy: ['પાણી નિકાસની વ્યવસ્થા કરો', 'ફંગલ રોગોથી બચાવ કરો', 'ખેતરમાં પાણી ભરાવા ન દો'],
        normal: ['નિયમિત સિંચાઈ કરો', 'માટીની ભેજ જાળવો', 'જંતુઓ પર નજર રાખો']
      }
    };

    const temp = weatherData.temperature;
    let category = 'normal';
    
    if (temp > 35) category = 'hot';
    else if (temp < 15) category = 'cold';
    else if (weatherData.description.includes('rain')) category = 'rainy';
    
    return recommendations[language]?.[category] || recommendations.hindi[category];
  }
}

const weatherService = new WeatherService();
export default weatherService;

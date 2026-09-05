import { LocationInfo, WeatherCondition, AirQualityData } from '../types';

export const KUZAGALI_LOCATION: LocationInfo = {
  name: 'Kuzagali',
  alternateNames: ['Kuza Gali', 'Kooza Gali', 'کوزہ گلی'],
  district: 'Abbottabad District',
  region: 'Galiyat / Hazara Region',
  province: 'Khyber Pakhtunkhwa',
  country: 'Pakistan',
  coordinates: {
    latitude: 34.0162,
    longitude: 73.4146,
  },
  elevation: {
    meters: 2400,
    feet: 7874,
  },
  postalCode: '22400',
  timezone: 'Asia/Karachi',
};

// Map WMO weather codes to human readable text and icon representations
function getWmoWeatherInfo(code: number): { text: string; icon: string } {
  switch (code) {
    case 0:
      return { text: 'Clear Sky', icon: 'Sun' };
    case 1:
      return { text: 'Mainly Clear', icon: 'SunMedium' };
    case 2:
      return { text: 'Partly Cloudy', icon: 'CloudSun' };
    case 3:
      return { text: 'Overcast', icon: 'Cloud' };
    case 45:
    case 48:
      return { text: 'Mountain Mist / Fog', icon: 'CloudFog' };
    case 51:
    case 53:
    case 55:
      return { text: 'Light Drizzle', icon: 'CloudDrizzle' };
    case 61:
    case 63:
      return { text: 'Moderate Rain', icon: 'CloudRain' };
    case 65:
      return { text: 'Heavy Alpine Rain', icon: 'CloudRainWind' };
    case 71:
    case 73:
    case 75:
      return { text: 'Snowfall', icon: 'CloudSnow' };
    case 77:
      return { text: 'Snow Grains', icon: 'Snowflake' };
    case 80:
    case 81:
    case 82:
      return { text: 'Rain Showers', icon: 'CloudRain' };
    case 85:
    case 86:
      return { text: 'Snow Showers', icon: 'CloudSnow' };
    case 95:
      return { text: 'Thunderstorm', icon: 'CloudLightning' };
    case 96:
    case 99:
      return { text: 'Thunderstorm with Hail', icon: 'CloudHail' };
    default:
      return { text: 'Alpine Breeze', icon: 'Wind' };
  }
}

function getWindDirectionText(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((degrees % 360) / 22.5) % 16;
  return directions[index];
}

export function getFallbackWeather(): WeatherCondition {
  return {
    temp: 18,
    feelsLike: 17,
    tempMin: 12,
    tempMax: 21,
    conditionCode: 2,
    conditionText: 'Partly Cloudy & Crisp',
    conditionIcon: 'CloudSun',
    humidity: 58,
    windSpeed: 11,
    windDirection: 'NW',
    windDirectionDegrees: 315,
    pressure: 1014,
    uvIndex: 5,
    visibility: 10,
    cloudCover: 35,
    dewPoint: 8,
    precipitationProbability: 15,
    sunrise: '05:48 AM',
    sunset: '06:35 PM',
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    hourly: [
      { time: '09:00', temp: 15, conditionText: 'Sunny', icon: 'Sun', precipitationProb: 0 },
      { time: '12:00', temp: 20, conditionText: 'Partly Cloudy', icon: 'CloudSun', precipitationProb: 10 },
      { time: '15:00', temp: 21, conditionText: 'Crisp Breeze', icon: 'CloudSun', precipitationProb: 15 },
      { time: '18:00', temp: 17, conditionText: 'Mountain Mist', icon: 'CloudFog', precipitationProb: 20 },
      { time: '21:00', temp: 13, conditionText: 'Clear Night', icon: 'Moon', precipitationProb: 5 },
      { time: '00:00', temp: 11, conditionText: 'Chilly', icon: 'Moon', precipitationProb: 0 },
    ],
    daily: [
      { day: 'Today', date: 'Current', tempMax: 21, tempMin: 12, conditionText: 'Partly Cloudy', icon: 'CloudSun' },
      { day: 'Tomorrow', date: 'Day 2', tempMax: 22, tempMin: 13, conditionText: 'Sunny & Fresh', icon: 'Sun' },
      { day: 'Day 3', date: 'Day 3', tempMax: 19, tempMin: 11, conditionText: 'Afternoon Showers', icon: 'CloudRain' },
      { day: 'Day 4', date: 'Day 4', tempMax: 18, tempMin: 10, conditionText: 'Mountain Mist', icon: 'CloudFog' },
      { day: 'Day 5', date: 'Day 5', tempMax: 20, tempMin: 12, conditionText: 'Clear Sky', icon: 'Sun' },
    ],
  };
}

export function getFallbackAirQuality(): AirQualityData {
  return {
    aqi: 28,
    status: 'Good',
    color: '#10b981', // Emerald green
    pm2_5: 6.4,
    pm10: 14.2,
    ozone: 38.5,
    nitrogenDioxide: 8.1,
    carbonMonoxide: 0.3,
    advice: 'Air quality in Kuzagali is exceptionally fresh and pristine. Ideal for outdoor hiking and forest walks.',
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export async function fetchKuzagaliWeather(): Promise<WeatherCondition> {
  try {
    const lat = KUZAGALI_LOCATION.coordinates.latitude;
    const lon = KUZAGALI_LOCATION.coordinates.longitude;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
    const data = await res.json();

    const current = data.current;
    const daily = data.daily;
    const hourly = data.hourly;

    const weatherInfo = getWmoWeatherInfo(current.weather_code ?? 0);
    const windDir = getWindDirectionText(current.wind_direction_10m ?? 0);

    // Build hourly forecast for next 6 time slots
    const nowHour = new Date().getHours();
    const hourlyItems = [];
    if (hourly && hourly.time) {
      for (let i = 0; i < hourly.time.length && hourlyItems.length < 6; i++) {
        const itemHour = new Date(hourly.time[i]).getHours();
        if (i >= nowHour && hourlyItems.length < 6) {
          const itemWeather = getWmoWeatherInfo(hourly.weather_code[i] ?? 0);
          hourlyItems.push({
            time: `${itemHour.toString().padStart(2, '0')}:00`,
            temp: Math.round(hourly.temperature_2m[i]),
            conditionText: itemWeather.text,
            icon: itemWeather.icon,
            precipitationProb: Math.round(hourly.precipitation_probability ? hourly.precipitation_probability[i] ?? 0 : 0),
          });
        }
      }
    }

    // Build 5-day daily forecast
    const dailyItems = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (daily && daily.time) {
      for (let i = 0; i < Math.min(5, daily.time.length); i++) {
        const d = new Date(daily.time[i]);
        const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayNames[d.getDay()];
        const itemWeather = getWmoWeatherInfo(daily.weather_code[i] ?? 0);
        dailyItems.push({
          day: dayLabel,
          date: daily.time[i],
          tempMax: Math.round(daily.temperature_2m_max[i]),
          tempMin: Math.round(daily.temperature_2m_min[i]),
          conditionText: itemWeather.text,
          icon: itemWeather.icon,
        });
      }
    }

    return {
      temp: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      tempMin: Math.round(daily?.temperature_2m_min?.[0] ?? current.temperature_2m - 5),
      tempMax: Math.round(daily?.temperature_2m_max?.[0] ?? current.temperature_2m + 4),
      conditionCode: current.weather_code ?? 0,
      conditionText: weatherInfo.text,
      conditionIcon: weatherInfo.icon,
      humidity: Math.round(current.relative_humidity_2m ?? 50),
      windSpeed: Math.round(current.wind_speed_10m ?? 10),
      windDirection: windDir,
      windDirectionDegrees: current.wind_direction_10m ?? 0,
      pressure: Math.round(current.surface_pressure ?? 1013),
      uvIndex: Math.round(daily?.uv_index_max?.[0] ?? 5),
      visibility: 12,
      cloudCover: Math.round(current.cloud_cover ?? 20),
      dewPoint: Math.round(current.temperature_2m - ((100 - (current.relative_humidity_2m ?? 50)) / 5)),
      precipitationProbability: Math.round(daily?.precipitation_probability_max?.[0] ?? 10),
      sunrise: daily?.sunrise?.[0] ? new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '05:48 AM',
      sunset: daily?.sunset?.[0] ? new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:35 PM',
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hourly: hourlyItems.length > 0 ? hourlyItems : getFallbackWeather().hourly,
      daily: dailyItems.length > 0 ? dailyItems : getFallbackWeather().daily,
    };
  } catch (err) {
    console.warn('Using fallback weather data for Kuzagali:', err);
    return getFallbackWeather();
  }
}

export async function fetchKuzagaliAirQuality(): Promise<AirQualityData> {
  try {
    const lat = KUZAGALI_LOCATION.coordinates.latitude;
    const lon = KUZAGALI_LOCATION.coordinates.longitude;
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Air Quality API error: ${res.status}`);
    const data = await res.json();
    const current = data.current;

    const usAqi = Math.round(current.us_aqi ?? 25);
    let status: AirQualityData['status'] = 'Good';
    let color = '#10b981'; // Emerald
    let advice = 'Crisp, pure Himalayan pine air. Excellent for all outdoor activities.';

    if (usAqi <= 50) {
      status = 'Good';
      color = '#10b981';
      advice = 'Pristine mountain air quality with minimal particulate matter.';
    } else if (usAqi <= 100) {
      status = 'Moderate';
      color = '#f59e0b';
      advice = 'Acceptable air quality; exceptionally sensitive individuals should observe comfort.';
    } else if (usAqi <= 150) {
      status = 'Unhealthy for Sensitive Groups';
      color = '#f97316';
      advice = 'Sensitive individuals should limit prolonged outdoor exertion.';
    } else {
      status = 'Unhealthy';
      color = '#ef4444';
      advice = 'Haze observed in the valley; consider limiting high-intensity trekking.';
    }

    return {
      aqi: usAqi,
      status,
      color,
      pm2_5: Number((current.pm2_5 ?? 6.2).toFixed(1)),
      pm10: Number((current.pm10 ?? 12.8).toFixed(1)),
      ozone: Number((current.ozone ?? 34.0).toFixed(1)),
      nitrogenDioxide: Number((current.nitrogen_dioxide ?? 5.5).toFixed(1)),
      carbonMonoxide: Number(((current.carbon_monoxide ?? 200) / 1000).toFixed(2)),
      advice,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  } catch (err) {
    console.warn('Using fallback air quality for Kuzagali:', err);
    return getFallbackAirQuality();
  }
}

import React, { useState } from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  Snowflake,
  CloudLightning,
  CloudHail,
  Wind,
  Droplets,
  Gauge,
  SunDim,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  ShieldCheck,
  Trees,
  Sparkles,
} from 'lucide-react';
import { WeatherCondition, AirQualityData } from '../types';

interface WeatherConditionsBarProps {
  weather: WeatherCondition;
  airQuality: AirQualityData;
  loading: boolean;
  onRefresh: () => void;
}

export const WeatherConditionsBar: React.FC<WeatherConditionsBarProps> = ({
  weather,
  airQuality,
  loading,
  onRefresh,
}) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [showDetailedForecast, setShowDetailedForecast] = useState(false);

  const convertTemp = (tempC: number) => {
    if (unit === 'F') {
      return Math.round((tempC * 9) / 5 + 32);
    }
    return tempC;
  };

  // Render proper dynamic icon based on icon string
  const renderWeatherIcon = (iconName: string, className: string = 'w-7 h-7 text-[#D4AF37]') => {
    switch (iconName) {
      case 'Sun':
        return <Sun className={className} />;
      case 'SunMedium':
        return <SunMedium className={className} />;
      case 'CloudSun':
        return <CloudSun className={className} />;
      case 'Cloud':
        return <Cloud className={className} />;
      case 'CloudFog':
        return <CloudFog className={className} />;
      case 'CloudDrizzle':
        return <CloudDrizzle className={className} />;
      case 'CloudRain':
        return <CloudRain className={className} />;
      case 'CloudRainWind':
        return <CloudRainWind className={className} />;
      case 'CloudSnow':
        return <CloudSnow className={className} />;
      case 'Snowflake':
        return <Snowflake className={className} />;
      case 'CloudLightning':
        return <CloudLightning className={className} />;
      case 'CloudHail':
        return <CloudHail className={className} />;
      default:
        return <Wind className={className} />;
    }
  };

  // Air Quality status color in vibrant pine and luxury gold tones
  const getAqiBadgeStyle = (aqi: number) => {
    if (aqi <= 50) return 'bg-[#EAF5EE] text-[#0E3820] border-[#A8D5BA]';
    if (aqi <= 100) return 'bg-[#FDF8E7] text-[#8C6D23] border-[#EADBB8]';
    if (aqi <= 150) return 'bg-[#FEF2EB] text-[#C25E1A] border-[#F8D2BA]';
    return 'bg-[#FAECEB] text-[#9E2A2B] border-[#F2BCBA]';
  };

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-[#D6E3DB] shadow-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        
        {/* Main Bar Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Weather Primary Block (5 cols) */}
          <div className="md:col-span-5 flex items-center justify-between sm:justify-start gap-4 pr-0 md:pr-4 md:border-r md:border-[#D6E3DB]">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-2xl bg-[#0D2418] border border-[#D4AF37]/40 flex items-center justify-center shadow-xs">
                {renderWeatherIcon(weather.conditionIcon, 'w-8 h-8 text-[#F3D993]')}
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1E13] tracking-tight">
                    {convertTemp(weather.temp)}°{unit}
                  </span>
                  <span className="text-xs text-[#4F685A] font-mono ml-1">
                    Feels {convertTemp(weather.feelsLike)}°{unit}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs sm:text-sm font-serif italic text-[#16442A] font-bold">{weather.conditionText}</span>
                  <span className="text-[#8FB39D]">•</span>
                  <span className="text-xs font-mono text-[#4F685A]">
                    H: {convertTemp(weather.tempMax)}° L: {convertTemp(weather.tempMin)}°
                  </span>
                </div>
              </div>
            </div>

            {/* C / F Unit Toggle */}
            <div className="flex items-center rounded-xl bg-[#EAF2ED] p-0.5 border border-[#CFDFD5] ml-auto sm:ml-4 text-xs font-mono">
              <button
                onClick={() => setUnit('C')}
                className={`px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  unit === 'C' ? 'bg-[#FFFFFF] text-[#0B1E13] shadow-xs font-bold border border-[#CFDFD5]' : 'text-[#4F685A] hover:text-[#0B1E13]'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit('F')}
                className={`px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  unit === 'F' ? 'bg-[#FFFFFF] text-[#0B1E13] shadow-xs font-bold border border-[#CFDFD5]' : 'text-[#4F685A] hover:text-[#0B1E13]'
                }`}
              >
                °F
              </button>
            </div>
          </div>

          {/* Conditions Metrics Bar (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-3 gap-2 py-1 px-0 md:px-2 text-center sm:text-left">
            {/* Humidity */}
            <div className="bg-[#F4FAF6] rounded-xl p-2.5 border border-[#D8E8DF]">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[10px] font-mono uppercase tracking-wider text-[#3D604D]">
                <Droplets className="w-3 h-3 text-[#1D633F]" />
                <span>Humidity</span>
              </div>
              <p className="text-sm font-mono font-bold text-[#0B1E13] mt-0.5">{weather.humidity}%</p>
            </div>

            {/* Wind */}
            <div className="bg-[#F4FAF6] rounded-xl p-2.5 border border-[#D8E8DF]">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[10px] font-mono uppercase tracking-wider text-[#3D604D]">
                <Wind className="w-3 h-3 text-[#1D633F]" />
                <span>Pine Wind</span>
              </div>
              <p className="text-sm font-mono font-bold text-[#0B1E13] mt-0.5 truncate">
                {weather.windSpeed} <span className="text-[11px] font-normal text-[#3D604D]">{weather.windDirection}</span>
              </p>
            </div>

            {/* UV Index */}
            <div className="bg-[#F4FAF6] rounded-xl p-2.5 border border-[#D8E8DF]">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[10px] font-mono uppercase tracking-wider text-[#3D604D]">
                <SunDim className="w-3 h-3 text-[#D4AF37]" />
                <span>UV Index</span>
              </div>
              <p className="text-sm font-mono font-bold text-[#0B1E13] mt-0.5">
                {weather.uvIndex} <span className="text-[11px] font-normal text-[#3D604D]">/ 10</span>
              </p>
            </div>
          </div>

          {/* Air Quality & Actions Block (3 cols) */}
          <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-2.5 pl-0 md:pl-2">
            
            {/* Air Quality Badge with Pine Phytoncide indicator */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${getAqiBadgeStyle(airQuality.aqi)} shadow-2xs`}>
              <div className="w-2 h-2 rounded-full bg-[#167041] animate-pulse" />
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">Pine Air Purity</span>
                  <span className="font-mono font-bold text-xs">AQI {airQuality.aqi}</span>
                </div>
                <p className="text-[11px] font-medium leading-none mt-1 opacity-90">{airQuality.status}</p>
              </div>
            </div>

            {/* Refresh & Toggle Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onRefresh}
                disabled={loading}
                className="p-2 rounded-xl text-[#3D604D] hover:text-[#0B1E13] hover:bg-[#EAF2ED] border border-[#CFDFD5] transition-all cursor-pointer disabled:opacity-50"
                title="Refresh Live Atmospheric Readings"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D4AF37]' : ''}`} />
              </button>

              <button
                onClick={() => setShowDetailedForecast(!showDetailedForecast)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-[#0B1E13] bg-[#EAF2ED] hover:bg-[#DEEBE2] border border-[#CFDFD5] transition-colors cursor-pointer"
                title="Toggle Detailed Meteorological Report"
              >
                <span className="font-mono text-[11px]">Forecast</span>
                {showDetailedForecast ? <ChevronUp className="w-3.5 h-3.5 text-[#167041]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#3D604D]" />}
              </button>
            </div>

          </div>

        </div>

        {/* Expandable Mountain Forecast & Atmospheric Breakdown */}
        {showDetailedForecast && (
          <div className="mt-4 pt-4 border-t border-[#D6E3DB] animate-in slide-in-from-top duration-200">
            
            {/* Air Quality & Environment Deep Dive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              
              {/* Air Quality Metrics Breakdown */}
              <div className="bg-[#F4FAF6] rounded-2xl p-4 border border-[#D8E8DF]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B1E13] uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4 text-[#167041]" />
                    <span>Atmospheric & Forest Purity</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-[#EAF5EE] text-[#0E3820] border border-[#A8D5BA]">
                    AQI {airQuality.aqi} • {airQuality.status}
                  </span>
                </div>
                <p className="text-xs text-[#294234] leading-relaxed mb-3 font-sans">{airQuality.advice}</p>
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#D8E8DF] shadow-2xs">
                    <span className="text-[9px] text-[#4F685A] block uppercase">PM2.5</span>
                    <span className="font-bold text-[#0B1E13]">{airQuality.pm2_5}</span>
                  </div>
                  <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#D8E8DF] shadow-2xs">
                    <span className="text-[9px] text-[#4F685A] block uppercase">PM10</span>
                    <span className="font-bold text-[#0B1E13]">{airQuality.pm10}</span>
                  </div>
                  <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#D8E8DF] shadow-2xs">
                    <span className="text-[9px] text-[#4F685A] block uppercase">Ozone</span>
                    <span className="font-bold text-[#0B1E13]">{airQuality.ozone}</span>
                  </div>
                  <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#D8E8DF] shadow-2xs">
                    <span className="text-[9px] text-[#4F685A] block uppercase">NO₂</span>
                    <span className="font-bold text-[#0B1E13]">{airQuality.nitrogenDioxide}</span>
                  </div>
                </div>
              </div>

              {/* Atmospheric Details */}
              <div className="bg-[#F4FAF6] rounded-2xl p-4 border border-[#D8E8DF]">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B1E13] uppercase tracking-wide mb-2">
                  <Gauge className="w-4 h-4 text-[#D4AF37]" />
                  <span>Barometric & Mountain Moisture</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="flex items-center justify-between bg-[#FFFFFF] p-2.5 rounded-xl border border-[#D8E8DF] shadow-2xs">
                    <span className="text-[#4F685A]">Pressure:</span>
                    <span className="font-bold text-[#0B1E13]">{weather.pressure} hPa</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFFFFF] p-2.5 rounded-xl border border-[#D8E8DF] shadow-2xs">
                    <span className="text-[#4F685A]">Cloud:</span>
                    <span className="font-bold text-[#0B1E13]">{weather.cloudCover}%</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFFFFF] p-2.5 rounded-xl border border-[#D8E8DF] shadow-2xs">
                    <span className="text-[#4F685A]">Dew Pt:</span>
                    <span className="font-bold text-[#0B1E13]">{convertTemp(weather.dewPoint)}°{unit}</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFFFFF] p-2.5 rounded-xl border border-[#D8E8DF] shadow-2xs">
                    <span className="text-[#4F685A]">Precip:</span>
                    <span className="font-bold text-[#0B1E13]">{weather.precipitationProbability}%</span>
                  </div>
                </div>
              </div>

              {/* Daylight / Sun cycle */}
              <div className="bg-[#FAFDF8] rounded-2xl p-4 border border-[#D8E8DF]">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B1E13] uppercase tracking-wide mb-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Mountain Sunlight Cycle</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-2">
                  <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#D8E8DF] text-center shadow-2xs">
                    <span className="text-[10px] text-[#4F685A] block uppercase font-medium">Sunrise</span>
                    <span className="font-bold text-[#0B1E13]">{weather.sunrise}</span>
                  </div>
                  <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#D8E8DF] text-center shadow-2xs">
                    <span className="text-[10px] text-[#4F685A] block uppercase font-medium">Sunset</span>
                    <span className="font-bold text-[#0B1E13]">{weather.sunset}</span>
                  </div>
                </div>
                <p className="text-[10px] font-mono text-[#4F685A] text-center">
                  Updated: {weather.lastUpdated} • Alt: 2,400m Hazara Himalayan Belt
                </p>
              </div>

            </div>

            {/* 5-Day Mountain Forecast Strip in Pine Night Theme */}
            <div className="bg-[#08170F] text-[#F4F8F5] rounded-2xl p-5 border border-[#1A3826] shadow-xl">
              <div className="flex items-center justify-between mb-3.5 text-xs text-[#A3C2AE] font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span className="uppercase tracking-wider font-bold text-[#F3D993]">5-Day Alpine Meteorological Projection</span>
                </div>
                <span className="text-[#729B82] text-[11px]">Kuzagali Elevation Station: 2,400m</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {weather.daily.map((day, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0E2419] rounded-xl p-3 border border-[#1E432E] text-center flex flex-col items-center justify-between shadow-2xs hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <span className="text-xs font-serif font-bold text-[#FFFFFF]">{day.day}</span>
                    <div className="my-2">
                      {renderWeatherIcon(day.icon, 'w-6 h-6 text-[#F3D993]')}
                    </div>
                    <span className="text-[11px] text-[#A3C2AE] font-sans truncate w-full mb-1.5">{day.conditionText}</span>
                    <div className="text-xs font-mono font-bold text-[#FFFFFF]">
                      <span className="text-[#F3D993]">{convertTemp(day.tempMax)}°</span>
                      <span className="text-[#729B82] font-normal ml-1.5">{convertTemp(day.tempMin)}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};


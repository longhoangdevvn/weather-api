/**
 * File path: src/services/weatherAPI.service.ts
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherAPIService {
  constructor(private readonly configService: ConfigService) {}
  async getWeather(query: string) {
    const weatherAPIKey = this.configService.get('weatherAPIKey');
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${query}&days=3&aqi=yes&alerts=yes`;
    const response: Response = await fetch(url);

    if (response.status !== 200) {
      throw new Error('Unable to fetch weather data');
    }

    const data = await response.json();
    return data;
  }

  async getLocationInfo(query: string) {
    const weatherAPIKey = this.configService.get('weatherAPIKey');
    const url = `https://api.weatherapi.com/v1/search.json?key=${weatherAPIKey}&q=${query}`;
    const response: Response = await fetch(url);

    if (response.status !== 200) {
      throw new Error('Unable to fetch location data');
    }

    const data = await response.json();

    if (data.length === 0) {
      throw new Error('Location not found');
    }

    return data[0];
  }
}

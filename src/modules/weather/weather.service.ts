/**
 * File path: src/modules/weather/weather.service.ts
 */

import { Inject, Injectable } from '@nestjs/common';
import { GetWeatherDTO } from './dto/getWeather.dto';
import { WeatherAPIService } from 'src/services/weatherAPI.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import * as moment from 'moment';

@Injectable()
export class WeatherService {
  constructor(
    private readonly weatherAPIService: WeatherAPIService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  async getWeather(data: GetWeatherDTO) {
    const query = `${data.lat},${data.long}`;
    const locationInfo = await this.weatherAPIService.getLocationInfo(query);

    const { id } = locationInfo;
    const currentTime = moment().format('YYYY-MM-DD-HH');

    const cacheKey = `${id}-${currentTime}`;

    // Check if the data is already in the cache
    const cachedData = await this.cacheService.get(cacheKey);

    if (cachedData) {
      return { result: cachedData };
    }

    const result = await this.weatherAPIService.getWeather(query);

    // Store the data in the cache
    if (result) {
      this.cacheService.set(cacheKey, result, 360000);
    }

    return { result };
  }
}

/**
 * File path: src/modules/weather/weather.controller.ts
 */

import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDTO } from './dto/getWeather.dto';

@Controller('weathers')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @HttpCode(200)
  async getWeather(@Query() data: GetWeatherDTO) {
    const result = await this.weatherService.getWeather(data);
    return result;
  }
}

/**
 * File path: src/modules/weather/weather.module.ts
 */

import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherAPIService } from 'src/services/weatherAPI.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, WeatherAPIService],
})
export class WeatherModule {}

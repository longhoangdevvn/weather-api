import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { WeatherModule } from './modules/weather/weather.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfigService } from './configs/cache.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
      isGlobal: true,
    }),
    WeatherModule,
  ],
})
export class AppModule {}

/**
 File path: src/configs/configuration.ts
*/

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  weatherApiKey: process.env.WEATHER_API_KEY,
});

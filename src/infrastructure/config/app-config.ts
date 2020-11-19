import { Beer } from '../../domain';
import { AppData } from './app-data';
import { CircuitBreakerConfig } from './circuit-breaker-config';
import { loadConfig } from './load-config';
import { RemoteAPIConfig } from './remote-api-config';
import { TemperatureSensorAPIConfig } from './temperature-sensor-api';
import { UnknownCfg } from './types';

export class AppConfig {
  temperatureSensorAPI: TemperatureSensorAPIConfig;

  data: AppData;

  constructor(temperatureSensorAPI: TemperatureSensorAPIConfig, data: AppData) {
    this.temperatureSensorAPI = temperatureSensorAPI;
    this.data = data;
  }

  static load(filePath: string): AppConfig {
    const cfg = loadConfig(filePath);
    const sensorCfg = <UnknownCfg>cfg.temperature_sensor_api;
    const remoteCfg = new RemoteAPIConfig(<string>sensorCfg.base_url, <number>sensorCfg.timeout);
    const frequency = <number>sensorCfg.frequency;
    const cbCfg = new CircuitBreakerConfig(
      <number>sensorCfg.error_threshold_pct,
      <number>sensorCfg.reset_timeout,
    );
    const data = <UnknownCfg>cfg.data;
    const beers = (<UnknownCfg[]>data.beers).map(
      (b) => new Beer(
        <string>b.name,
        <number>b.lowest_safe_temp,
        <number>b.highest_safe_temp,
      ),
    );
    const dataCfg = new AppData(beers);
    const apiConfig = new TemperatureSensorAPIConfig(remoteCfg, frequency, cbCfg);
    return new AppConfig(apiConfig, dataCfg);
  }
}

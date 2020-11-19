import { Beer } from '../../domain';
import { AppData } from './app-data';
import { CircuitBreakerConfig } from './circuit-breaker-config';
import { GeneralConfig } from './general-config';
import { loadConfig } from './load-config';
import { RemoteAPIConfig } from './remote-api-config';
import { TemperatureSensorAPIConfig } from './temperature-sensor-api';
import { UnknownCfg } from './types';

export class AppConfig {
  general: GeneralConfig;

  temperatureSensorAPI: TemperatureSensorAPIConfig;

  data: AppData;

  constructor(
    general: GeneralConfig,
    temperatureSensorAPI: TemperatureSensorAPIConfig,
    data: AppData,
  ) {
    this.general = general;
    this.temperatureSensorAPI = temperatureSensorAPI;
    this.data = data;
  }

  static load(filePath: string): AppConfig {
    const cfg = loadConfig(filePath);
    const general = <UnknownCfg>cfg.general;
    const generalCfg = new GeneralConfig(<number>general.port);
    const sensor = <UnknownCfg>cfg.temperature_sensor_api;
    const remoteCfg = new RemoteAPIConfig(<string>sensor.base_url, <number>sensor.timeout);
    const frequency = <number>sensor.frequency;
    const cbCfg = new CircuitBreakerConfig(
      <number>sensor.error_threshold_pct,
      <number>sensor.reset_timeout,
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
    const apiCfg = new TemperatureSensorAPIConfig(remoteCfg, frequency, cbCfg);
    return new AppConfig(generalCfg, apiCfg, dataCfg);
  }
}

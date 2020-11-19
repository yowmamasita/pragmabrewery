import CircuitBreakerConfig from './circuit-breaker-config';
import loadConfig from './load-config';
import RemoteAPIConfig from './remote-api-config';
import TemperatureSensorAPIConfig from './temperature-sensor-api';

export default class AppConfig {
  temperatureSensorAPI: TemperatureSensorAPIConfig;

  constructor(temperatureSensorAPI: TemperatureSensorAPIConfig) {
    this.temperatureSensorAPI = temperatureSensorAPI;
  }

  static load(filePath: string): AppConfig {
    const config = loadConfig(filePath);
    const sensorCfg = <Record<string, unknown>>config.temperature_sensor_api;
    const remoteConfig = new RemoteAPIConfig(<string>sensorCfg.base_url, <number>sensorCfg.timeout);
    const frequency = <number>sensorCfg.frequency;
    const cbConfig = new CircuitBreakerConfig(
      <number>sensorCfg.error_threshold_pct,
      <number>sensorCfg.reset_timeout,
    );
    const apiConfig = new TemperatureSensorAPIConfig(remoteConfig, frequency, cbConfig);
    return new AppConfig(apiConfig);
  }
}

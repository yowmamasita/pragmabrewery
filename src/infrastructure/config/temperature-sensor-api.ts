import { CircuitBreakerConfig } from './circuit-breaker-config';
import { RemoteAPIConfig } from './remote-api-config';

export class TemperatureSensorAPIConfig {
  api: RemoteAPIConfig;

  checkFrequency: number;

  circuitBreaker: CircuitBreakerConfig;

  constructor(api: RemoteAPIConfig, checkFrequency: number, circuitBreaker: CircuitBreakerConfig) {
    this.api = api;
    this.checkFrequency = checkFrequency;
    this.circuitBreaker = circuitBreaker;
  }
}

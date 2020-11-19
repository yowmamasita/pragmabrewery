export default class CircuitBreakerConfig {
  errorThresholdPct: number;

  resetTimeout: number;

  constructor(errorThresholdPct: number, resetTimeout: number) {
    this.errorThresholdPct = errorThresholdPct;
    this.resetTimeout = resetTimeout;
  }
}

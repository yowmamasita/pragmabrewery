export default class RemoteAPIConfig {
  baseURL: string;

  timeout: number;

  constructor(baseURL: string, timeout: number) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }
}

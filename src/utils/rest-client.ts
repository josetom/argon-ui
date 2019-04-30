import axios, { AxiosInstance } from 'axios';

export default class RestClient {
  private data: any;
  private axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL
    })
  }

  public setAuthorization(token: string) {
    axios.defaults.headers.common['Authorization'] = token;
  }

}
import axios, { AxiosInstance } from 'axios';

export default class RestClient {
  private data: any;
  private axios: AxiosInstance;

  public request: any;
  public get: any;
  public delete: any;
  public head: any;
  public post: any;
  public put: any;
  public patch: any;

  private serverUrl: string = "http://localhost:9000";

  constructor(baseURL?: string) {
    if(!baseURL) {
      baseURL = this.serverUrl;
    }
    this.axios = axios.create({
      baseURL
    })

    this.request = this.axios.request;
    this.get = this.axios.get;
    this.delete = this.axios.delete;
    this.head = this.axios.head;
    this.post = this.axios.post;
    this.put = this.axios.put;
    this.patch = this.axios.patch;

  }

  public setAuthorization(token: string) {
    axios.defaults.headers.common['Authorization'] = token;
  }

}
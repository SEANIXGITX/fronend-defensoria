import { axiosClient } from './axios';

export class ApiService {
  async get(url: string) {
    return await axiosClient.get(url);
  }
  async post(url: string, parametros: object) {
    return await axiosClient.post(url, parametros);
  }
  async put(url: string, parametros: object) {
    return await axiosClient.put(url, parametros);
  }
  async delete(url: string) {
    return await axiosClient.delete(url);
  }
}

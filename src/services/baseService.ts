import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ServiceResponse } from '../types';

/**
 * Classe base para serviços Python
 * Facilita comunicação com APIs externas
 */
export abstract class BaseService {
  protected client: AxiosInstance;
  protected baseURL: string;

  constructor(baseURL: string, timeout: number = 5000) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para logs
    this.client.interceptors.request.use(
      (config) => {
        console.log(`📡 ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Erro na requisição:', error);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log(`✅ ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error(`❌ ${error.response?.status} ${error.config?.url}:`, error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Faz uma requisição GET
   */
  protected async get<T>(endpoint: string): Promise<ServiceResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.get(endpoint);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  /**
   * Faz uma requisição POST
   */
  protected async post<T>(endpoint: string, data?: any): Promise<ServiceResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.post(endpoint, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  /**
   * Faz uma requisição PUT
   */
  protected async put<T>(endpoint: string, data?: any): Promise<ServiceResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.put(endpoint, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  /**
   * Faz uma requisição DELETE
   */
  protected async delete<T>(endpoint: string): Promise<ServiceResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(endpoint);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }
}

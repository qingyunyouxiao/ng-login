import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() { 
    axios.defaults.baseURL = 'http://localhost:8080'; // Set your base URL here
    axios.defaults.headers.post['Content-Type'] = 'application/json'; // Set default content type
  }

  request(method: string, url: string, data: any): Promise<any> {
    return axios.request({
      method: method,
      url: url,
      data: data
    });
  }
}

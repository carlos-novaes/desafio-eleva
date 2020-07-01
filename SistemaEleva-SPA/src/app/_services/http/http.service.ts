import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { School } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createSchool(schoolToCreate: any) {
    return this.http.post(`${this.baseUrl}/schools/create`, schoolToCreate);
  }
}

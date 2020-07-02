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

  getSchools() {
    return this.http.get(`${this.baseUrl}/schools/`);
  }

  getSchoolDetails(schoolId: number) {
    return this.http.get(`${this.baseUrl}/schools/${schoolId}`);
  }

  updateSchool(school: any) {
    return this.http.put(`${this.baseUrl}/schools/${school.id}`, school);
  }

  createClass(classToCreate: any) {
    return this.http.post(`${this.baseUrl}/classes/createClass`, classToCreate);
  }

  getClasses(schoolId: number) {
    return this.http.get(`${this.baseUrl}/classes/getClasses?schoolId=${schoolId}`);
  }
}

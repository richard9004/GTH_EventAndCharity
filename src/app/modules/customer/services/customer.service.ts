import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = "http://localhost:8080/"; 

@Injectable({
  providedIn: 'root'
})
export default class CustomerService {

  constructor(private http: HttpClient) { } 

  postCar(formData: any): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      console.error("No token found! Cannot send the request.");
      return null;
    }
  
    const headers = this.createAuthorizationHeader();
    console.log("Final Headers:", headers);
  
    return this.http.post(BASE_URL + "api/customer/car", formData, { headers });
  }

  getAllCars(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(BASE_URL + "api/customer/cars", { headers });
  }
  

  // createAuthorizationHeader(): HttpHeaders {
  //   let authHeaders: HttpHeaders = new HttpHeaders();
  //   return authHeaders.set(
  //     'Authorization',
  //     'Bearer '+StorageService.getToken()
  //   );

  // }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();
    console.log("Authorization Header:", 'Bearer ' + token);
    return authHeaders.set('Authorization', 'Bearer ' + token);
  }
  
}

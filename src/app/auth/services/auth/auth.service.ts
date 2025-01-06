import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const BASE_URL = "http://localhost:8080/"; 
//const BASE_URL = "https://gth-backend.onrender.com/"; 


@Injectable({
  providedIn: 'root'
  
})
export class AuthService {

  constructor(private http:HttpClient) { }

  registeruser(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL+"api/auth/signup", signupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL+"api/auth/login", loginRequest);
  }

   // Registration function
   submitOrhanizerRegistration(registrationData: any): Observable<any> {
    return this.http.post(BASE_URL + "api/auth/organizer/register", registrationData);
  }


}

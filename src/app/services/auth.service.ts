import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // !!! IMPORTANT: Adjust this URL to match your GoLang backend's address
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  // Method to register a new user
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Method to log a user in
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
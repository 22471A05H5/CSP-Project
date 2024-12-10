import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8082/user';

  constructor(private http: HttpClient) {}

  register(user: { username: string, password: string, email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }


  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${user.id}`, user);
  }

  sendMessage(contactForm: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, contactForm);
  }

}

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = {
      "user_email": email,
      "user_password": password,
    };

    return this.http.post('http://localhost:3000/user/login', body)
      .pipe(
        tap((res: any) => {
          const authToken = res.token ?? '';
          this.saveToken(authToken);
        })
      );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.decodeJWT();
  }

  private decodeJWT() {
    const token = localStorage.getItem('token') ?? '';;
    const usuario = jwt_decode(token);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token') || ''; // get token from local storage

    if (token) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }
}

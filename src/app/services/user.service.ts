import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    const body = {
      "user_full_name": user.fullName,
      "user_email": user.email,
      "user_password": user.password,
    };
    return this.http.post('http://localhost:3000/user/signup', body)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) { }

  login(student: any) {
    return this.http.post<any>('http://localhost:4000/student', student);
  }

  isLogged() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
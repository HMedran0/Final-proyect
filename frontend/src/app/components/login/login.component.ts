import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private jwtHelper: JwtHelperService
  ) { }

  student = {
    email: '',
    password: '',
  };

  login() {
    if (!this.student.email || !this.student.password) {
      this.toastr.info('All fields are required', 'Info!')
    } else {
      this.loginService.login(this.student).subscribe((res) => {
        if (res.token) {
          const decoded = this.jwtHelper.decodeToken(res.token);
          this.toastr.success(`Hola ${decoded.name}!`);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/login'])
        } else {
          this.toastr.warning(`${res.message}`, 'Advertencia!')
        }
      },
        (err) => {
          this.toastr.error(
            'An error has ocurred, please try again later',
            'Error!');
        }
      );
    }
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../interface/loginRequest';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';
import { ManagementInfoService } from '../../services/management-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(private _userService: UserService, private router: Router, private _errorService: ErrorService, private _f1 :ManagementInfoService) { ;
  }
  loading: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)])
  })

  get email() { return this.loginForm.get('email')?.value };
  get password() { return this.loginForm.get('password')?.value };
  login() {
    if (this.loginForm.valid) {
      const user: LoginRequest = {
        email: this.email || '',
        password: this.password || ''
      }
      this._userService.login(user).subscribe({
        next: (data) => {
          console.log(data);
          this.dataToLS(data);
          console.log(localStorage);
          
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
          this.loading = false;
        }
      })
    }
  }
  dataToLS(data : string){
    const arrayToken = data.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    const id : number = tokenPayload.id;
    const score : number = tokenPayload.score;
    const error : number = tokenPayload.error;
    const total : number = tokenPayload.total;
    this.router.navigateByUrl('/home');
    localStorage.setItem('token', data);
    localStorage.setItem('id', String(id));
    localStorage.setItem('score', String(score));
    localStorage.setItem('error', String(error));
    localStorage.setItem('total', String(total))
  }
}


import { afterNextRender, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interface/loginRequest';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styles: ``
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService:LoginService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    })
  }

  ngOnInit(): void {   
   }

   login() {
    let user = this.loginService.login(this.loginForm.value as LoginRequest);
    if (this.loginForm.valid) {
      console.log(user);
  }
}

  goRegister(){
  } 
  
}

import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  public message: string = '';
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService:UserService){
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    });
  }
register(){
  if(this.registerForm.valid){

    const newUser: User = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }
    this.userService.saveUser(newUser)
    .then( response => {
      this.message = "Sign Up Successfully";
    }).catch( error => { this.message = 'An error has ocurred! OMG, Messi I love u'});
  }
  else{
    console.log('form down');
  }
  console.log(this.message);
}
ngOnInit(){}

}



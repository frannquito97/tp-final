import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  public message: string = '';
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    });
  }
  register() {
    if (this.registerForm.valid) {
      this.userService.getUser().then(users => {
        let ultimoId = 0;

        if (users.length > 0) {
          ultimoId = Math.max(...users.map((user: { id: any; }) => user.id));
        }

        const newUser: User = {
          id: ultimoId + 1,
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value,
          firstName: this.registerForm.get('name')?.value,
          lastName: this.registerForm.get('lastName')?.value,
          userName: this.registerForm.get('userName')?.value
        };

        this.userService.saveUser(newUser)
          .then(response => {
            this.message = "Sign Up Successfully";
            this.router.navigateByUrl('f1Games');
          })
          .catch(error => {
            this.message = 'An error has ocurred! OMG, Messi I love u'
          });
        console.log(this.message);
      })
        .catch(error => {
          this.message = 'Error al obtener los usuarios';
        });
    }
    else {
      console.log('form no es valido');
    }
  }
  ngOnInit() { }

}



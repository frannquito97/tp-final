import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interface/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: ``
})
export class SignInComponent {
  constructor(private _userService: UserService, private router: Router,private _errorService : ErrorService) { }
  loading: boolean = false;
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  get email() { return this.signInForm.get('email')?.value };
  get name() { return this.signInForm.get('name')?.value };
  get lastName() { return this.signInForm.get('lastName')?.value };
  get username() { return this.signInForm.get('username')?.value };
  get password() { return this.signInForm.get('password')?.value };
  get confirmPassword() { return this.signInForm.get('confirmPassword')?.value }


  addUser() {
    console.log(this.password);
    console.log(this.confirmPassword);

    if (this.signInForm.valid) {
      if (this.confirmPassword != this.password) {
        Swal.fire({
          title: 'Contraseñas incorrectas!',
          icon: 'error',
          html: 'Las contraseñas no son identicas, por favor vuelve a ingresarlas.',
          confirmButtonColor: 'red',
          confirmButtonText: 'Volver a ingresar datos',
          allowOutsideClick: false,
          animation: true
        })
        return;
      }

      const user: User = {
        id: 0,
        name: this.name || '',
        lastName: this.lastName || '',
        email: this.email || '',
        username: this.username || '',
        password: this.password || ''
      }
      this.loading = true;
      this._userService.signIn(user).subscribe({
        next: async (v) => {
          await Swal.fire({
            title: 'Usuario Registrado!',
            icon: 'success',
            confirmButtonText: 'Iniciar Sesion',
            confirmButtonColor: 'green',
            allowOutsideClick: false,
            allowEscapeKey: false,
            html: `${this.email} registrado exitosamente!`,
            animation: true
          }).then( (result) => {
            if(result){
              this.router.navigateByUrl('/f1Games');
            }
          });        
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);          
        }
      })
    }else{
      Swal.fire({
        title: 'Registro incompleto',
        html: 'Complete todos los campos antes de enviar el registro',
        icon: 'warning',
        animation: true,
        confirmButtonText: 'Volver al registro',
        confirmButtonColor: 'red',
        allowOutsideClick: false
      })
    }
  }
}
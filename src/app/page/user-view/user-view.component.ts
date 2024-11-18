import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../interface/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: ``
})
export class UserViewComponent implements OnInit {

  editForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl('', [Validators.minLength(4), Validators.maxLength(8)]),
    confirmPassword: new FormControl('', [Validators.minLength(4), Validators.maxLength(8)])
  });

  get name() { return this.editForm.get('name')?.value };
  get lastName() { return this.editForm.get('lastName')?.value };
  get password() { return this.editForm.get('password')?.value };
  get confirmPassword() { return this.editForm.get('confirmPassword')?.value };

  currentUser?: User;
  editingMode: boolean = false;
  score: number = 0;
  error: number = 0;
  totalScore: number = 0;
  //updateUser: any = {};

  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit() {
    this.score = Number(localStorage.getItem('score'));
    this.error = Number(localStorage.getItem('error'));
    this.totalScore = this.score - this.error;
    this._userService.getUserData(Number(localStorage.getItem('id'))).subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    })
  }

  async edit() {
    const { value: formValues } = await Swal.fire({
      title: "Multiple inputs",
      html: `
        <div class="form-floating mb-3 mt-3">
          <input type="text" class="form-control form-control-sm" style="width: 85%" disabled value="${this.currentUser?.email}">
          <label>Email</label>
        </div>
        <div class="form-floating mb-3 mt-3">
          <input type="text" class="form-control form-control-sm" style="width: 85%" disabled value="${this.currentUser?.username}">
          <label>Usuario</label>
        </div>
                  <div class="form-floating mb-3 mt-3">
            <input type="text" id="name" class="form-control form-control-sm" style="width: 85%">
            <label>Nombre</label>
          </div>
          <div class="form-floating mb-3 mt-3">
            <input type="text" id="lastName" class="form-control form-control-sm" style="width: 85%">
            <label>Apellido</label>
          </div>
          <div class="form-floating mb-3 mt-3">
            <input type="password" id="password" class="form-control form-control-sm" style="width: 85%"  placeholder="Nueva Contraseña">
            <label>Nueva Contraseña</label>
          </div>
          <div class="form-floating mb-3 mt-3">
             <input type="password" id="confirmPassword" class="form-control form-control-sm" style="width: 85%"  placeholder="Confirmar Contraseña">
             <label>Confirmar Contraseña</label>
          </div>
        
      `,
      focusConfirm: false,
      preConfirm: () => {
        let name = (document.getElementById('name') as HTMLInputElement).value;
        let lastName = (document.getElementById('lastName') as HTMLInputElement).value;  
        let password = (document.getElementById('password') as HTMLInputElement).value;  
        const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;  
        if(password.length>0){
          if (password != confirmPassword) {
            Swal.showValidationMessage('Las Contraseñas deben ser iguales');
            return null;
          }
          else if(password.length < 4 || password.length>16){
            Swal.showValidationMessage('La contraseña debe tener entre 4 y 16 caracteres');
            return null;
          }
        }
        else{
          password = this.currentUser?.password || '';
        }
        if(name.length == 0){
          name = this.currentUser?.name || ''
        }
        if(lastName.length == 0){
          lastName = this.currentUser?.lastName || ''
        }
        return {name, lastName, password}
      }
    });
    if (formValues) {
      console.log(formValues);
      let user: User = {
        id: Number(localStorage.getItem('id')),
        email: '',
        username: '',
        name: formValues.name || this.currentUser?.name,
        lastName: formValues.lastName || this.currentUser?.lastName,
        password: formValues.password || this.currentUser?.password
      }
      this._userService.updateUser(Number(localStorage.getItem('id')),user).subscribe({
        next: (data) => { 
          console.log(data), 
          window.location.reload();
        }})
      
    }
      /*Swal.fire({
      title: 'Editar Usuario',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      html:
        `
        <div class="form-floating mb-3 mt-3">
          <input type="text" class="form-control form-control-sm" style="width: 85%" disabled value="${this.currentUser?.email}">
          <label>Email</label>
        </div>
        <div class="form-floating mb-3 mt-3">
            <input type="text" class="form-control form-control-sm" style="width: 85%" disabled value="${this.currentUser?.username}">
            <label>Usuario</label>
        </div>
        <form [formGroup]="editForm">
          <div class="form-floating mb-3 mt-3">
            <input type="text" formControlName="name" class="form-control form-control-sm" style="width: 85%">
            <label>Nombre</label>
          </div>
          <div class="form-floating mb-3 mt-3">
            <input type="text" formControlName="lastName" class="form-control form-control-sm" style="width: 85%">
            <label>Apellido</label>
          </div>
          <div class="form-floating mb-3 mt-3">
            <input type="password" formControlName="password" class="form-control form-control-sm" style="width: 85%"  placeholder="Nueva Contraseña">
            <label>Nueva Contraseña</label>
          </div>
          <div class="form-floating mb-3 mt-3">
             <input type="password" formControlName="confirmPassword" class="form-control form-control-sm" style="width: 85%"  placeholder="Confirmar Contraseña">
             <label>Confirmar Contraseña</label>
          </div>
        </form>
        `,
        focusConfirm: false,
    }).then((result) => {
      console.log(this.editForm);
      
      if (this.confirmPassword === this.password) {
        if (result.isConfirmed) {
          console.log('hola');
          let userUpdate: User =
          {
            id: Number(localStorage.getItem('id')),
            email: '',
            username: '',
            name: this.name || '',
            lastName: this.lastName || '',
            password: this.password || ''
          }
          Swal.fire('Usuario Actualizado', '', 'success');
          this._userService.updateUser(Number(localStorage.getItem('id')), userUpdate).subscribe({
            next: (data) => { console.log('usuario actualizado');}
          });
        }
        else if (result.isDenied) {
          this.router.navigateByUrl(`myProfile/${localStorage.getItem('id')}`)
        }
      }
      else {
        Swal.fire('Error al guardar usuario', '', 'error');
      }
    })
  }*/
  }
}
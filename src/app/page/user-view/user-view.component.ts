import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: ``
})
export class UserViewComponent implements OnInit {

  editForm = new FormGroup({
    name: new FormControl(`${this.currentUser?.name}`),
    lastName: new FormControl(`${this.currentUser?.lastName}`),
    password: new FormControl(`${this.currentUser?.password}`, [Validators.minLength(4), Validators.maxLength(8)]),
    confirmPassword: new FormControl(`${this.currentUser?.password}`, [Validators.minLength(4), Validators.maxLength(8)])
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

  edit(): void {
      Swal.fire({
      title: 'Editar Usuario',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      html:
        `
        <div class="form-floating mb-3 mt-3">
          <input type="text" id="email" class="form-control form-control-sm" style="width: 85%" disabled value="${this.currentUser?.email}">
          <label>Email</label>
        </div>
          <div class="form-floating mb-3 mt-3">
          <input type="text" id="username" class="form-control form-control-sm" style="width: 85%" disabled value="${this.currentUser?.username}">
          <label>Usuario</label>
        </div>
        </div>
        <div class="form-floating mb-3 mt-3">
          <input type="text" id="name" class="form-control form-control-sm" style="width: 85%" value="${this.currentUser?.name}">
          <label>Nombre</label>
        </div>
        <div class="form-floating mb-3 mt-3">
          <input type="text" id="lastName" class="form-control form-control-sm" style="width: 85%" value="${this.currentUser?.lastName}">
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
    }).then((result) => {
  
      if (this.confirmPassword === this.password) {
        if (result.isConfirmed) {
          let userUpdate: User =
          {
            id: Number(localStorage.getItem('id')),
            email: this.currentUser?.email || '',
            username: this.currentUser?.username || '',
            name: this.name || this.currentUser?.name || '',
            lastName: this.lastName || this.currentUser?.lastName || '',
            password: this.password || ''
          }
          Swal.fire('Usuario Actualizado', '', 'success');
          this._userService.updateUser(Number(localStorage.getItem('id')), userUpdate);
        }
        else if (result.isDenied) {
          this.router.navigateByUrl(`myProfile/${localStorage.getItem('id')}`)
        }
      }
      else {
        Swal.fire('Error al guardar usuario', '', 'error');
      }
    })
  }
  saveChanges(): void {
    //TODO modificacion de usuario
  }
}
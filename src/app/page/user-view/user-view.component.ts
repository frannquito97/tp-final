import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: ``
})
export class UserViewComponent implements OnInit{

  currentUser?: User;
  editingMode: boolean = false;
  //updateUser: any = {};

  constructor(private route: ActivatedRoute, private _userService : UserService){}

ngOnInit(){
  this._userService.getUserData(Number(localStorage.getItem('id'))).subscribe({
    next: (user) =>{
      this.currentUser = user;
    }
  })
}

edit(): void{
this.editingMode = !this.editingMode;
}

saveChanges(): void{
 //TODO modificacion de usuario
}
}
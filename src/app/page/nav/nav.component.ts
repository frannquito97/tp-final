import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: ``
})
export class NavComponent implements OnInit{
  public tokenBoolean: boolean = localStorage.getItem('token')!=undefined ? true : false;
  public currentUser?: User | undefined;
  constructor(private _userService: UserService, private router : Router){
    this._userService.getUserData(Number(localStorage.getItem('id'))).subscribe({
      next: (user) =>
        this.currentUser = user
    });
  }

  ngOnInit(){
  }
  userProfile(){
    this.router.navigateByUrl(`myProfile/${this.currentUser?.id}`);
  }

  logOut(){
    this.currentUser = undefined;
    localStorage.clear();
    this.router.navigateByUrl('/f1Games');

  }
}

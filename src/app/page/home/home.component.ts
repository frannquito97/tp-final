import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interface/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  /*styleUrl: './home.component.css'*/
})
export class HomeComponent {
  public currentUser?: User;
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

  name = this.currentUser?.username

  }
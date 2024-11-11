import { Injectable, OnInit } from '@angular/core';
import { LoginRequest } from '../interface/loginRequest';
import { User} from '../interface/user';
import { ManagementInfoService } from './management-info.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public arrayUser: Array<User> = [];
  ngOnInit(){
    this.arrayUser = this.managementInfo.getUserArray();
  }
  
  constructor(private managementInfo : ManagementInfoService,private userService:UserService) { }

  login(credentials:LoginRequest): User | any{
    console.log(this.arrayUser);
  let logged: User | any=  this.arrayUser.find(userToFind => userToFind.email == credentials.email && userToFind.password == credentials.password);
    return logged;
  }
}
    
  


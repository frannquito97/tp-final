import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styles: ``,
  providers: [DatePipe] 
})

export class RegisterUserComponent {
  
  newUserForm : FormGroup;

  constructor ( private userService : UserService, private datePipe : DatePipe, private fb : FormBuilder){
    this.newUserForm= this.fb.group({
      firstName : new FormControl(''),  
      lastName  : new FormControl(''),
      dateBorn  : new FormControl(''),
      userName  : new FormControl(''),
      email     : new FormControl(''),
      password  : new FormControl(''),
      passwordValidate : new FormControl('')
    });
   }

  ngOnInit(){

  }

  newUser(){

    let user = new User();
    user.id = 4;
    user.firstName = this.newUserForm.get('firstName')?.value!;
    user.lastName = this.newUserForm.get('lastName')?.value!;
    user.email = this.newUserForm.get('email')?.value!;
    user.dateBorn =  this.newUserForm.get('dateBorn')?.value!;
    user.username = this.newUserForm.get('userName')?.value!;
    user.password = this.newUserForm.get('password')?.value!;
    
    this.userService.addUser(user).subscribe(
      response =>   {
        console.log('Server Response: ', response);
      },
      error => {
        console.error('Server Error: ', error);
      }
    )
  }
}

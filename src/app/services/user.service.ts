import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlUser = 'http://localhost:3000/user';
  constructor(private http : HttpClient, private router : Router) { }

  getAll() : Promise<any> {
    return this.http.get(this.urlUser).toPromise();
  }
  getUserById( id : number ) : Promise<any> {
    return this.http.get(this.urlUser + '/' + id).toPromise();
  }

  addUser(user : User) : Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.urlUser, user, { headers });
  }
  
  // getUserPassByUsername( username : string): User {
  //   let userLoged;
  //   let arrayUser;
  //   arrayUser = this.getAll();
  //   return userLoged;
  // }
}

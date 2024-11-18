import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment } from '../../environments/environment';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interface/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppURL : String;
  private myApiURL : String;

  constructor(private http : HttpClient) {

    this.myAppURL = 'http://localhost:3003/';
    this.myApiURL = 'api/users/';
   }
   signIn(user : User): Observable<any> {
    return this.http.post(`${this.myAppURL}${this.myApiURL}`, user);
   }
   login( user: LoginRequest): Observable<string>{
    return this.http.post<string>(`${this.myAppURL}${this.myApiURL}login`, user);
   }
   getUserData(id: number) : Observable<User>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.myAppURL}${this.myApiURL}${id}`, {headers: headers})
   }
   updateUser(id: number, userUpdate: User) : Observable<boolean>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<boolean>(`${this.myAppURL}${this.myApiURL}${id}`, userUpdate, {headers : headers})
   }
   getUsers() : Observable<User[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<User[]>(`${this.myAppURL}${this.myApiURL}`,{headers:headers} );
   }
  }

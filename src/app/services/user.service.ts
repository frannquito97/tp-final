import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interface/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http : HttpClient) {}
   signIn(user : User): Observable<any> {
    return this.http.post(`${environment.API}/users`, user);
   }
   login( user: LoginRequest): Observable<string>{
    return this.http.post<string>(`${environment.API}/users/login`, user);
   }
   getUserData(id: number) : Observable<User>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${environment.API}/users/${id}`, {headers: headers})
   }
   updateUser(id: number, userUpdate: User) : Observable<boolean>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.put<boolean>(`${environment.API}/users/${id}`, {id: userUpdate.id, name: userUpdate.name, lastName: userUpdate.lastName, password: userUpdate.password}, {headers : headers})
   }
   getUsers() : Observable<User[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<User[]>(`${environment.API}/users`,{headers:headers} );
   }
  }

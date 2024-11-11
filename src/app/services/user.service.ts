import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';
  
    
  constructor(private http: HttpClient) {

   }
   getUser() : Promise<any>{
    return this.http.get(this.apiUrl).toPromise();
   }
   saveUser( user : User) : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
   return this.http.post(this.apiUrl, user, httpOptions).toPromise();
   
   }
   ngOnInit(){

   }
}

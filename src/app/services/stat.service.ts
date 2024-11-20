import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stat } from '../interface/stat';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  constructor(private http : HttpClient) { }

  updateStat(score : Number, text: string, id : number) : Observable<boolean>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<boolean>(`${environment.API}/stats`, {score, text, id}, { headers: headers});
  }
  getCurrentStats(id: number) : Observable<Stat>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Stat>(`${environment.API}/stats/${id}`, {headers: headers});
  }
}

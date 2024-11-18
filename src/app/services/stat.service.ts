import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stat } from '../interface/stat';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private urlApi = 'api/stats';
  private urlApp ='http://localhost:3003';

  constructor(private http : HttpClient) { }

  updateStat(score : Number, text: string, id : number) : Observable<boolean>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<boolean>(`${this.urlApp}/${this.urlApi}/`, {score, text, id}, { headers: headers});
  }
  getCurrentStats(id: number) : Observable<Stat>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Stat>(`${this.urlApp}/${this.urlApi}/${id}`, {headers: headers});
  }
}

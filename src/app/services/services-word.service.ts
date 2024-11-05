import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ServicesWordService {


  urlBase: string = 'http://ergast.com/api/f1'
  
  urlCarrera:string = '/2008/results/1'
  
  constructor(private http: HttpClient) { }
  
  getCarreras():Promise<any>{
    return this.http.get(this.urlBase + this.urlCarrera + '.json').toPromise()
  }
  
}

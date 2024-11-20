import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class F1InfoService {
   constructor(private http : HttpClient){ }
  getWinnersBySeason( year : string ) : Observable<any> {
    console.log(`${environment.F1API}/${year}/results/1.json`);
    return this.http.get<any>(`${environment.F1API}/${year}/results/1.json`);
  }
  getDrivers( year : number): Observable<any>{
    return this.http.get<any>(`${environment.F1API}/${year}/drivers.json`);
  }
  getConstructorByDriver( driverId : string, season: number): Observable<any> {   
    return this.http.get<any>(`${environment.F1API}/${season}/drivers/${driverId}/constructors.json`);
  }
}

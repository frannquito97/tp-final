import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPilosts } from '../interfaces/interfacesGames/new-pilosts';

@Injectable({
  providedIn: 'root'
})
export class F1InfoService {
  private apiUrl: string  = 'http://ergast.com/api/f1/';
  private endUrl: string = '.json';
  private drivers : string = '/drivers';
  private results : string = '/results';
  constructor(
    private http : HttpClient
  ){ }

  getDriversBySeasonAPI( year : string ) : Promise<any> {
  return this.http.get(this.apiUrl + year + this.drivers + this.endUrl).toPromise()
  }
  
  getDrivers(year : string): Observable<any> {
    return this.http.get<any>(this.apiUrl + year + this.drivers, { responseType: 'json' });
  }
  
  getWinnersBySeason( year : string ) : Promise<any> {
    console.log(this.apiUrl + year + this.results + '/1' + this.endUrl);
    return this.http.get(this.apiUrl + year + this.results + '/1' + this.endUrl).toPromise();
  }
}

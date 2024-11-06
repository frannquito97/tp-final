import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  getWinnersBySeason( year : string ) : Promise<any> {
    console.log(this.apiUrl + year + this.results + '/1' + this.endUrl);
    return this.http.get(this.apiUrl + year + this.results + '/1' + this.endUrl).toPromise();
  }
}

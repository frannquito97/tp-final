import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewPilosts } from '../interfaces/interfacesGames/new-pilosts';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class PilotsService {

  http = inject(HttpClient);
  
  getDrivers():Observable<any>{
    return this.http.get<any>(environment.urlPilots)
  }
  
}

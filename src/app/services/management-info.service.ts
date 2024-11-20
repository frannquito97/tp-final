import { Injectable, resolveForwardRef } from '@angular/core';
import { F1InfoService } from './f1-info.service';
import { Race } from '../interface/interfacesGames/race';
import { UserService } from './user.service';
import { User } from '../interface/user';
import { Driver } from '../interface/interfacesGames/driver';

@Injectable({
  providedIn: 'root'
})
export class ManagementInfoService {
  public season: Race[] = [];
  public drivers: Driver[] = [];

  constructor(private _f1Service: F1InfoService, private userService: UserService) { }

  getRacesWins(year:string): Array<Race> {
    let data = [];
    this._f1Service.getWinnersBySeason(year).then(response => {
      data = response['MRData']['RaceTable']['Races'];
      console.log(data);
      if (data != null) {
        data.forEach((dt: any) => {
          let race: Race = {
            raceId: dt['Circuit']['circuitId'],
            season: dt['season'],
            raceName: dt['raceName'],
            location: dt['Circuit']['Location']['country'],
            driver :  {
              id: dt['Results'][0]['Driver']['driverId'],
              numberCar: dt['Results'][0]['Driver']['permanentNumber'],
              name: dt['Results'][0]['Driver']['givenName'],
              lastName: dt['Results'][0]['Driver']['familyName'],
              constructor: dt['Results'][0]['Constructor']['name'],
              nationality: dt['Results'][0]['Driver']['nationality']
            }

          }
          this.season.push(race);
        });
      }
    })
    return this.season;
  }
  getDrivers(): Driver[]{

    this._f1Service.getDrivers(2024).subscribe({
      next: (data) => { 
        let info = [];
        info = data['MRData']['DriverTable']['Drivers'];
        if(info){
          info.forEach( (aux : any) => {
            let driver : Driver = {
              id: aux.driverId,
              name: aux.givenName,
              lastName: aux.familyName,
              constructor: data['MRData']['DriverTable']['season'],
              nationality: aux.nationality,
              numberCar: aux.permanentNumber,
              
              
            }
            this.addConstructor(driver);
            this.drivers.push(driver);
          })
        }
      }
    })
    return this.drivers;
  }
  addConstructor(driver : Driver){
    this._f1Service.getConstructorByDriver(driver.id, Number(driver.constructor)).subscribe({
      next: (data) => { driver.constructor = data['MRData']['ConstructorTable']['Constructors'][0]['name'];
      }
    })     
  }
    
}


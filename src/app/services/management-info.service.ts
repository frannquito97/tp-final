import { Injectable, resolveForwardRef } from '@angular/core';
import { F1InfoService } from './f1-info.service';
import { Race } from '../interface/interfacesGames/race';
import { Driver } from '../interface/interfacesGames/driver';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ManagementInfoService {
  public season: Race[] = [];
  public drivers: Driver[] = [];

  constructor(private _f1Service: F1InfoService, private _errorService: ErrorService) { }

  getRaceData(year: number, race: number): Race[] {
    let data: Race[] = [];
    this._f1Service.getDriverOptions(year,race).subscribe({
      next: (info) => {
        data = info['MRData']['RaceTable'];
        /// ACA ME DA LOS RANDOM, NECESITO LO MISMO PERO CON EL GANADOR TAMBIEN (POSICION 0)
        data.forEach((race: any) => {
        const winner = race['Races']['Results'][1];
        const winnerRace: Race = {
          raceId: race['Races']['Circuit']['circuitId'],
          season: race['season'],
          raceName: race['Races']['raceName'],
          location: race['Races']['Circuit']['Location']['country'],
          driver: {
            id: winner['Driver']['driverId'],
            numberCar: winner['Driver']['permanentNumber'],
            name: winner['Driver']['givenName'],
            lastName: winner['Driver']['familyName'],
            constructor: winner['Constructor']['name'],
            nationality: winner['Driver']['nationality'],
            url: winner['Driver']['url']
          }
        };
        this.season.push(winnerRace);

        ////HACER DEL 1 AL 4 Y YA FUE, ASI NO SE REPITEN LOS PLAYERS Y CHAU TOTAL SON TODAS CARRERAS DIFERENTES
/// HASTA ACA AGREGA EL GANADOR EN EL ARREGLO
        for (let i = 1; i < 4; i++) {
         let randomNumber = Math.floor(Math.random() * race['Results'].length) + 1;
        const result = race['Races']['Results'][randomNumber];

        const newRace: Race = {
        raceId: race['Races']['Circuit']['circuitId'],
        season: race['season'],
        raceName: race['Races']['raceName'],
        location: race['Races']['Circuit']['Location']['country'],
        driver: {
          id: result['Driver']['driverId'],
          numberCar: result['Driver']['permanentNumber'],
          name: result['Driver']['givenName'],
          lastName: result['Driver']['familyName'],
          constructor: result['Constructor']['name'],
          nationality: result['Driver']['nationality'],
          url: result['Driver']['url']
          }
        };
      this.season.push(newRace);
    }
    console.log(this.season);

})
      },
      error: async (e : HttpErrorResponse) => {this._errorService.msjError(e)
        await  Swal.fire({
          title: 'ERROR',
          html: 'An error ocurred, please reload the page.',
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonText: 'Reload Page'
        }).then((result) =>{
          if(result){
            window.location.reload()
          }else{
            window.location.reload();
          }
        })
      }
    })
    return this.season;
  }

  getDriversForGame(year: number, race: number): Race[] {
    let data: Race[] = [];
    this._f1Service.getDriverOptions(year,race).subscribe({
      next: (info) => {
        data = info['MRData']['RaceTable']['Races'];
        console.log(data);
        let random = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
        data.forEach((race: any) => {
          let newRace: Race = {
            raceId: race['Circuit']['circuitId'],
            season: race['season'],
            raceName: race['raceName'],
            location: race['Circuit']['Location']['country'],
            driver: {
              id: race['Results'][random]['Driver']['driverId'],
              numberCar: race['Results'][random]['Driver']['permanentNumber'],
              name: race['Results'][random]['Driver']['givenName'],
              lastName: race['Results'][random]['Driver']['familyName'],
              constructor: race['Results'][random]['Constructor']['name'],
              nationality: race['Results'][random]['Driver']['nationality'],
              url: race['Results'][random]['Driver']['url']
            }
          }
          this.season.push(newRace);
        })
      },
      error: async (e : HttpErrorResponse) => {this._errorService.msjError(e)
        await  Swal.fire({
          title: 'ERROR',
          html: 'An error ocurred, please reload the page.',
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonText: 'Reload Page'
        }).then((result) =>{
          if(result){
            window.location.reload();
          }else{
            window.location.reload();
          }
        })
      }
    })
    return this.season;
  }

  getDrivers(year: number): Driver[] {
    this._f1Service.getDrivers(year).subscribe({
      next: (data) => {
        let info = [];
        info = data['MRData']['DriverTable']['Drivers'];
        if (info) {
          info.forEach((aux: any) => {
            let driver: Driver = {
              id: aux.driverId,
              name: aux.givenName,
              lastName: aux.familyName,
              constructor: data['MRData']['DriverTable']['season'],
              nationality: aux.nationality,
              numberCar: aux.permanentNumber,
              url: aux.url
            }
            this.addConstructor(driver);
            this.drivers.push(driver);
          })
        }
      },
    })
    return this.drivers;
  }
  addConstructor(driver: Driver) {
    this._f1Service.getConstructorByDriver(driver.id, Number(driver.constructor)).subscribe({
      next: (data) => {
        driver.constructor = data['MRData']['ConstructorTable']['Constructors'][0]['name'];
      }
    })
  }


    getRaces(year: number): Race[] {
    let data: Race[] = [];

    this._f1Service.getRacesPerYear(year).subscribe({
      next: (info) => {
        data = info['MRData']['RaceTable'];
        data.forEach((race: any) => {
        const winner = race['Races']['Results'][1];
        const winnerRace: Race = {
          raceId: race['Races']['Circuit']['circuitId'],
          season: race['season'],
          raceName: race['Races']['raceName'],
          location: race['Races']['Circuit']['Location']['country'],
          driver: {
            id: winner['Drivers']['driverId'],
            numberCar: winner['Drivers']['permanentNumber'],
            name: winner['Drivers']['givenName'],
            lastName: winner['Drivers']['familyName'],
            constructor: winner['Constructors']['name'],
            nationality: winner['Drivers']['nationality'],
            url: winner['Drivers']['url']
          }
        };
        this.season.push(winnerRace);
      });
    }
  });
return this.season;
}


}


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

  getRacesWins(year: string): Race[] {
    let data: Race[] = [];
    this._f1Service.getWinnersBySeason(year).subscribe({
      next: (info) => {
        data = info['MRData']['RaceTable']['Races'];
        console.log(data);
        data.forEach((race: any) => {
          let newRace: Race = {
            raceId: race['Circuit']['circuitId'],
            season: race['season'],
            raceName: race['raceName'],
            location: race['Circuit']['Location']['country'],
            driver: {
              id: race['Results'][0]['Driver']['driverId'],
              numberCar: race['Results'][0]['Driver']['permanentNumber'],
              name: race['Results'][0]['Driver']['givenName'],
              lastName: race['Results'][0]['Driver']['familyName'],
              constructor: race['Results'][0]['Constructor']['name'],
              nationality: race['Results'][0]['Driver']['nationality'],
              url: ''
            }
          }
          this.season.push(newRace);
        })
      },
      error: async (e : HttpErrorResponse) => {this._errorService.msjError(e)
      await  Swal.fire({
          title: 'ERROR',
          html: 'OCURRIO UN ERROR AL CARGAR EL JUEGO, POR FAVOR RECARGA LA PAGINA',
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonText: 'Recargar Pagina'
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

}


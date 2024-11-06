import { Injectable } from '@angular/core';
import { F1InfoService } from './f1-info.service';
import { Races } from '../interface/interfacesGames/races';

@Injectable({
  providedIn: 'root'
})
export class ManagementInfoService {
  public season: Races[] = [];
  constructor(private f1Info: F1InfoService) { }

  getRacesWins(/*PARAMETRO DEL AÑO ALEATORIO*/): Array<Races> {
    let data = [];
    this.f1Info.getWinnersBySeason("2024").then(response => {
      data = response['MRData']['RaceTable']['Races'];
      console.log(data);
      if (data != null) {
        data.forEach( (dt: any) => {
          let race: Races = {
            raceId: dt['Circuit']['circuitId'],
            season: dt['season'],
            raceName: dt['raceName'],
            location: dt['Circuit']['Location']['country'],
            driverName: dt['Results']['0']['Driver']['givenName'],
            driverLastName: dt['Results']['0']['Driver']['familyName'],
            driverConstructor: dt['Results']['0']['Constructor']['name'],
            driverNationality: dt['Results']['0']['Driver']['nationality']
          }
          this.season.push(race);
        });
      }
    })
    return this.season;
  }
}
import { Injectable, resolveForwardRef } from '@angular/core';
import { F1InfoService } from './f1-info.service';
import { Race } from '../interface/interfacesGames/race';
import { UserService } from './user.service';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class ManagementInfoService {
  public season: Race[] = [];
  public users: User[] = [];
  constructor(private f1Info: F1InfoService, private userService: UserService) { }

  getRacesWins(/*PARAMETRO DEL AÑO ALEATORIO*/): Array<Race> {
    let data = [];
    this.f1Info.getWinnersBySeason("2024").then(response => {
      data = response['MRData']['RaceTable']['Race'];
      console.log(data);
      if (data != null) {
        data.forEach((dt: any) => {
          let race: Race = {
            raceId: dt['Circuit']['circuitId'],
            season: dt['season'],
            raceName: dt['raceName'],
            location: dt['Circuit']['Location']['country'],
            driver : {
              id: dt['Driver']['Results']['Driver']['driverId'],
              numberCar: dt['Driver']['Results']['Driver']['permanentNumber'],
              name: dt['Driver']['Results']['Driver']['givenName'],
              lastName: dt['Driver']['Results']['Driver']['familyName'],
              constructor: dt['Driver']['Results']['Constructor']['name'],
              nationality: dt['Driver']['Results']['Driver']['nationality']
            }

          }
          this.season.push(race);
        });
      }
    })
    return this.season;
  }

}


import { Component } from '@angular/core';
import { ServicesWordService } from '../../../services/services-word.service';
import { Races } from '../../../interface/interfacesGames/races';
import { ManagementInfoService } from '../../../services/management-info.service';
@Component({
  selector: 'app-word-game',
  templateUrl: './word-game.component.html',
  styles: ``,
})
export class WordGameComponent {
  constructor(private infoF1: ManagementInfoService) {}
  public datos: Array<Races> = [];

  conjuntoPilotos: string[] = [];

  ngOnInit() {
    this.datos = this.infoF1.getRacesWins();
    console.log(this.datos);
    this.conjuntoPilotos.sort();
  }

  inicio = 0;
  fin = 12;

  renderGame() {
    this.conjuntoPilotos.splice(0, this.conjuntoPilotos.length);
    let auxPiloto;
    let enteroAleatorio = this.inicio + Math.floor(Math.random() * this.fin);

    auxPiloto =
      this.datos[enteroAleatorio + 1].driverName +
      ' ' +
      this.datos[enteroAleatorio + 1].driverLastName;
    this.conjuntoPilotos.push(auxPiloto);
    auxPiloto =
      this.datos[enteroAleatorio + 2].driverName +
      ' ' +
      this.datos[enteroAleatorio + 2].driverLastName;
    this.conjuntoPilotos.push(auxPiloto);

    auxPiloto =
      this.datos[enteroAleatorio].driverName +
      ' ' +
      this.datos[enteroAleatorio].driverLastName;
    this.conjuntoPilotos.push(auxPiloto);

    auxPiloto =
      this.datos[enteroAleatorio - 1].driverName +
      ' ' +
      this.datos[enteroAleatorio - 1].driverLastName;
    this.conjuntoPilotos.push(auxPiloto);

    auxPiloto =
      this.datos[enteroAleatorio - 2].driverName +
      ' ' +
      this.datos[enteroAleatorio - 2].driverLastName;
    this.conjuntoPilotos.push(auxPiloto);
    auxPiloto =
      this.datos[enteroAleatorio + 3].driverName +
      ' ' +
      this.datos[enteroAleatorio + 3].driverLastName;
    this.conjuntoPilotos.push(auxPiloto);
    let arraySinDuplicados = [...new Set(this.conjuntoPilotos)];
    this.conjuntoPilotos = arraySinDuplicados;
    this.anio = this.datos[enteroAleatorio].season;
    this.circuito = this.datos[enteroAleatorio].location;
    this.season = this.datos[enteroAleatorio].season;
    this.escuderia = this.datos[enteroAleatorio].driverConstructor;
    this.piloto =
      this.datos[enteroAleatorio].driverName +
      ' ' +
      this.datos[enteroAleatorio].driverLastName;
    this.nacionalidad = this.datos[enteroAleatorio].driverNationality;
    this.raceName = this.datos[enteroAleatorio].raceName;
  }
  raceName = '';
  nacionalidad = '';
  season: string = '';
  jugar: boolean = false;
  anio = '';
  circuito = '';
  escuderia = '';
  companero = '';
  piloto: string = '';
  pista1 = false;
  pista2 = false;
  respuestaPiloto = false;
  sigPiloto = true;
  pistaUno() {
    this.pista1 = true;
  }
  pistaDos() {
    this.pista2 = true;
  }

  winner() {
    this.renderGame();
    this.pista1 = false;
    this.pista2 = false;
    this.sigPiloto = false;
    this.respuestaPiloto = false;
  }

  respuesta(e: Event) {
    if (String(e) == this.piloto) {
      this.respuestaPiloto = true;
    }
  }

  startGame() {
    this.jugar = true;
  }
}

import { Component } from '@angular/core';
import { ServicesWordService } from '../../../services/services-word.service';
@Component({
  selector: 'app-word-game',
  templateUrl: './word-game.component.html',
  styles: ``,
})
export class WordGameComponent {
  constructor(private carreras: ServicesWordService) {}

  ngOnInit() {
    this.carreras
      .getCarreras()
      .then((response) => {
        this.piloto =
          response['MRData']['RaceTable']['Races'][0]['Results'][0][
            'Driver'
          ].driverId;
        console.log(
          response['MRData']['RaceTable']['Races'][0]['Results'][0]['Driver']
            .driverId
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  anio = '2022';
  circuito = 'MONACO';
  posicion = '12';
  escuderia = 'FERRARI';
  companero = 'ALONSO';
  piloto:string = '' ;
  pista1 = false;
  pista2 = false;
  respuestaPiloto = false;
  pistaUno() {
    this.pista1 = true;
  }
  pistaDos() {
    this.pista2 = true;
  }

  respuesta(e: Event) {
    if (String(e) == this.piloto) {
      this.respuestaPiloto = true;
    }
  }
}

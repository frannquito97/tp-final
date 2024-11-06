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

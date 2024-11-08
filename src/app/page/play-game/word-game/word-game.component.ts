import { Component, inject } from '@angular/core';
import { ServicesWordService } from '../../../services/services-word.service';
import { Races } from '../../../interface/interfacesGames/races';
import { ManagementInfoService } from '../../../services/management-info.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { compileNgModule } from '@angular/compiler';

import { Router,RouterModule,RouterLink } from '@angular/router';

@Component({
  selector: 'app-word-game',
  templateUrl: './word-game.component.html',
  styles: ``,
})
export class WordGameComponent {
routerLink: any;
  constructor(private infoF1: ManagementInfoService) {}
  
  
  public datos: Array<Races> = [];

  public conjuntoPilotos: string[] = [];

  ngOnInit() {
    this.datos = this.infoF1.getRacesWins();
  }

  inicio = 6;
  fin = 16;
  enteroAleatorio = 0;

  renderNumber() {
    this.enteroAleatorio =
    Math.floor(Math.random() * (16 - 6 + 1)) + 6;
      alert(this.enteroAleatorio);
  }
  

  renderGame() {
    this.conjuntoPilotos = [...new Set(this.conjuntoPilotos)];
    this.conjuntoPilotos.splice(0, this.conjuntoPilotos.length);

    let auxPiloto;
    this.renderNumber();

    auxPiloto =
      this.datos[this.enteroAleatorio + 1].driverName +
      ' ' +
      this.datos[this.enteroAleatorio + 1].driverLastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');

    auxPiloto =
      this.datos[this.enteroAleatorio + 2].driverName +
      ' ' +
      this.datos[this.enteroAleatorio + 2].driverLastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');

    auxPiloto =
      this.datos[this.enteroAleatorio].driverName +
      ' ' +
      this.datos[this.enteroAleatorio].driverLastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');

    auxPiloto =
      this.datos[this.enteroAleatorio - 1].driverName +
      ' ' +
      this.datos[this.enteroAleatorio - 1].driverLastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');

    auxPiloto =
      this.datos[this.enteroAleatorio - 2].driverName +
      ' ' +
      this.datos[this.enteroAleatorio - 2].driverLastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');
    auxPiloto =
      this.datos[this.enteroAleatorio + 3].driverName +
      ' ' +
      this.datos[this.enteroAleatorio + 3].driverLastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');
    // this.conjuntoPilotos = [...new Set(this.conjuntoPilotos)];

    console.log('LOS PILOTOS SON: ', this.conjuntoPilotos);

    this.anio = this.datos[this.enteroAleatorio].season;
    this.circuito = this.datos[this.enteroAleatorio].location;
    this.season = this.datos[this.enteroAleatorio].season;
    this.escuderia = this.datos[this.enteroAleatorio].driverConstructor;
    this.piloto =
      this.datos[this.enteroAleatorio].driverName +
      ' ' +
      this.datos[this.enteroAleatorio].driverLastName;
    alert(this.piloto);
    this.nacionalidad = this.datos[this.enteroAleatorio].driverNationality;
    this.raceName = this.datos[this.enteroAleatorio].raceName;
    alert('Pilotos cargados ' + this.conjuntoPilotos);
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
  sigPiloto = false;
  renderWindows: boolean = true;

  pistaUno() {
    this.pista1 = true;
  }
  pistaDos() {
    this.pista2 = true;
    console.log(this.conjuntoPilotos);
  }

  winner() {
    this.renderGame();
    this.renderWindows = false;
    this.pista1 = false;
    this.pista2 = false;
    this.respuestaPiloto = false;
    this.sigPiloto = false;
    this.renderWindows = true;
    
  }

  respuesta(e: Event) {
    if (String(e) == this.piloto) {
      this.respuestaPiloto = true;
    }
  }

  startGame() {
    this.jugar = true;
  }

  /// Para el formulario

  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    pilot: ['', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {
    if (this.form.invalid) return;
    if (this.form.getRawValue().pilot.toUpperCase == this.piloto.toUpperCase) {
      this.sigPiloto = true;
    } else {
      alert(this.form.getRawValue().pilot + ': No era el piloto');
    }
  }
}

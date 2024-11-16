import { Component, inject } from '@angular/core';
import { Race } from '../../../interface/interfacesGames/race';
import { Driver } from '../../../interface/interfacesGames/driver';
import { ManagementInfoService } from '../../../services/management-info.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-word-game',
  templateUrl: './word-game.component.html',
  styles: ``,
})
export class WordGameComponent {
  ngOnInit() {
    this.datos = this.infoF1.getRacesWins(this.renderNumberAnio());
    this.playSound();
  }

  routerLink: any;

  constructor(private infoF1: ManagementInfoService) {}

  public datos: Array<Race> = [];

  public conjuntoPilotos: string[] = [];

  inicioAnio = 1960;
  finanio = 2024;

  enteroAleatorio = 0;

  renderNumber(a: number, b: number) {
    this.enteroAleatorio = Math.floor(Math.random() * (b - a + 1)) + a;

    if (this.enteroAleatorio >= this.datos.length - 3) {
      this.enteroAleatorio -= 3;
    }

    if (this.enteroAleatorio < 2) {
      this.enteroAleatorio += 4;
    }
    alert(this.enteroAleatorio);
  }

  renderNumberAnio() {
    const anio =
      Math.floor(Math.random() * (this.finanio - this.inicioAnio + 1)) +
      this.inicioAnio;
    alert(this.anio);
    return anio.toString();
  }

  renderGame() {
    this.conjuntoPilotos = [...new Set(this.conjuntoPilotos)];
    this.conjuntoPilotos.splice(0, this.conjuntoPilotos.length);

    let auxPiloto;
    this.renderNumber(0, this.datos.length);

    auxPiloto =
      this.datos[this.enteroAleatorio + 1].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio + 1].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');

    auxPiloto =
      this.datos[this.enteroAleatorio + 2].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio + 2].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');

    auxPiloto =
      this.datos[this.enteroAleatorio].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');

    auxPiloto =
      this.datos[this.enteroAleatorio - 1].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio - 1].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');

    auxPiloto =
      this.datos[this.enteroAleatorio - 2].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio - 2].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');
    auxPiloto =
      this.datos[this.enteroAleatorio + 3].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio + 3].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nullo');
    this.conjuntoPilotos = [...new Set(this.conjuntoPilotos)];

    console.log('LOS PILOTOS SON: ', this.conjuntoPilotos);

    this.anio = this.datos[this.enteroAleatorio].season;
    this.circuito = this.datos[this.enteroAleatorio].location;
    this.season = this.datos[this.enteroAleatorio].season;
    this.escuderia = this.datos[this.enteroAleatorio].driver.constructor;
    this.piloto =
      this.datos[this.enteroAleatorio].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio].driver.lastName;

    this.nacionalidad = this.datos[this.enteroAleatorio].driver.nationality;
    this.raceName = this.datos[this.enteroAleatorio].raceName;
  }
  //Info necesaria para la las preguntas
  raceName = '';
  nacionalidad = '';
  season: string = '';
  jugar: boolean = false;
  anio = '';
  circuito = '';
  escuderia = '';
  companero = '';
  piloto: string = '';
  //booleanos para habiliar HTML con pistas
  pista1 = false;
  pista2 = false;
  //Booleano para detectar si el piloto es el ganador
  respuestaPiloto = false;
  //Renderiza HTML en caso de ganar
  sigPiloto = false;
  //Para volver a renderizar la pantalla evitando errores
  renderWindows: boolean = true;
  //Variable para extraer la info de los botones de los posibles pilotos
  pilotButton: string = '';

  //Boleano para ver si selecciono un boton del piloto
  selected: boolean = false;

  //Si le erra el piloto se renderiza el HTML indicando que le erro
  errorPiloto: boolean = false;

  //Un enrutador para redirijis la pagina
  router = inject(Router);

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
    this.pilotButton = '';
    this.errorPiloto = false;
    this.renderWindows = true;
    this.datos.splice(0, this.datos.length);

    this.datos = this.infoF1.getRacesWins(this.renderNumberAnio());
    this.renderNumber(0, this.datos.length);
  }

  respuesta(e: Event) {
    if (String(e) === this.piloto) {
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

  //Con esta funcion hacemos que al seleccionar un piloto lo guarde y asi pintarlo luego
  mark(pilot: string) {
    this.pilotButton = pilot;
  }

  //Funciones del boton
  cambiado = false; // Variable para rastrear el estado

  toggleColor(): void {
    this.cambiado = !this.cambiado; // Alternar el valor entre true y false
  }
  //

  onSubmit() {
    this.playSound2();
    const data: string = this.pilotButton;
    const dataWinner: string = this.piloto;
    if (data == dataWinner) {
      this.sigPiloto = true;
      alert(this.piloto + 'ESTE ERA EL GANADOR');
      alert(data + 'Este es el del form');
    } else {
      this.sigPiloto = false;
      alert(data + ': No era el piloto');
      this.errorPiloto = true;
    }
  }
  //funcion para volver al home
  backHome() {
    this.router.navigateByUrl('home');
  }

  //Sonidos

  playSound() {
    const audio = new Audio('../../../assets/sounds/WordGame.mp3'); // Ruta al archivo de sonido
    audio.play();
  }

  playSound2() {
    const audio = new Audio('../../../assets/sounds/PushWordGame.mp3'); // Ruta al archivo de sonido
    audio.play();
  }
}

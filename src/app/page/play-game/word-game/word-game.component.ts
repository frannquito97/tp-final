import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { Race } from '../../../interface/interfacesGames/race';
import { ManagementInfoService } from '../../../services/management-info.service';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StatService } from '../../../services/stat.service';
import { TimerComponent } from '../../../components/timer/timer.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-word-game',
  templateUrl: './word-game.component.html',
  styles: ``,
})
export class WordGameComponent {

  @ViewChild(TimerComponent) timerComponent!: TimerComponent;

  constructor(private infoF1: ManagementInfoService, private _statService : StatService) {}
  duration = environment.duration;

  ngAfterViewInit(): void{ }
  
  iniciarJuego(): void{
    setTimeout(() => { 
      if(this.timerComponent){
      this.timerComponent.iniciarTimer();
   }
  }, 0);
  }

  salirDelJuego(): void{
    this.jugar = false;
  }

  private puntosAGanar: number = 3;
  public datos: Array<Race> = [];
  public conjuntoPilotos: string[] = [];

  ngOnInit() {
  this.datos = this.infoF1.getRacesWins(this.renderNumberAnio());
  }
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
  }

  renderNumberAnio() {
    const anio =
      Math.floor(Math.random() * (this.finanio - this.inicioAnio + 1)) +
      this.inicioAnio;
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
      : console.log('Piloto nulo');

    auxPiloto =
      this.datos[this.enteroAleatorio + 2].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio + 2].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nulo');

    auxPiloto =
      this.datos[this.enteroAleatorio].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nulo');

    auxPiloto =
      this.datos[this.enteroAleatorio - 1].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio - 1].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nulo');

    auxPiloto =
      this.datos[this.enteroAleatorio - 2].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio - 2].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nulo');
    auxPiloto =
      this.datos[this.enteroAleatorio + 3].driver.name +
      ' ' +
      this.datos[this.enteroAleatorio + 3].driver.lastName;
    auxPiloto
      ? this.conjuntoPilotos.push(auxPiloto)
      : console.log('Piloto nulo');
    this.conjuntoPilotos = [...new Set(this.conjuntoPilotos)];

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
  pilAux: string = '';
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
    this.puntosAGanar = this.puntosAGanar - 1;
    console.log(this.puntosAGanar);
    
    this.pista1 = true;
  }
  pistaDos() {
    this.puntosAGanar = this.puntosAGanar - 1;
    this.pista2 = true;
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
    this.puntosAGanar = 3;
    this.renderNumber(0, this.datos.length);
  }

  respuesta(e: Event) {
    if (String(e) === this.piloto) {
      this.respuestaPiloto = true;
    }
  }

  startGame() {
    this.jugar = true;
    console.log('entre');
    this.iniciarJuego();
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

 async onSubmit() {
    let interval;
    const data: string = this.pilotButton;
    const dataWinner: string = this.piloto;
    if(this.pilotButton != ''){
      if (data == dataWinner) {
        this.errorPiloto = false;
        this.sigPiloto = true;
        this.pilAux = '';
        this.actualizarPuntos("gana");
        await Swal.fire({
          title: 'Respuesta Correcta.',
          html: `La respuesta es correcta! Felicidades se le sumaron: ${this.puntosAGanar} a sus estadisticas`,
          animation: true,
          icon: 'success',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: 'Siguiente Piloto',
          cancelButtonText: 'Volver al Inicio',
        }).then((result) => {
          if(result.value){
            this.winner();
          }else if( result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/home');
          }
        });
      
    } else {
        this.sigPiloto = false;
        this.pilAux = data;
        this.errorPiloto = true;
        this.actualizarPuntos("pierde");

      await  Swal.fire({
          title: 'Respuesta Incorrecta.',
          html: `La Respuesta correcta es: ${this.piloto}. Se le sumo: 1 punto como errores en sus estadisticas`,
          animation: true,
          icon: 'error',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: 'Siguiente Piloto',
          cancelButtonText: 'Volver al Inicio',
        }).then((result) => {
          if(result.value){
            this.winner();
          }else if( result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/home');
          }
        });
    }
  }else{
    Swal.fire({
      title: 'ERROR',
      html: 'No selecciono ningun piloto, porfavor seleccione uno',
      icon: 'error',
    })
  }
 }
  backHome() {
    this.router.navigateByUrl('home');
  }
  actualizarPuntos(string : string){
    if(string == "pierde"){
      let error = Number(localStorage.getItem("error"));
      let totalError:number = 0;
      if(this.puntosAGanar == 3){
        totalError = error + 1;
      }else if( this.puntosAGanar == 2){
        totalError = error + 2;
      }else if ( this.puntosAGanar == 1){
        totalError = error + 3
      }
      this._statService.updateStat(totalError, 'error', Number(localStorage.getItem('id'))).subscribe({
        next: (data) => {localStorage.setItem('error', String(totalError));}
      });
    }else{
      let score = Number(localStorage.getItem("score"));      
      let total = score + this.puntosAGanar;  
      this._statService.updateStat(total, 'score', Number(localStorage.getItem('id'))).subscribe({
        next: (data) => {localStorage.setItem('score', String(total))}
      });
    }
  }
}

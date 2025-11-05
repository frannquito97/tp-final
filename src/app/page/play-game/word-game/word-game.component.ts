import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { Race } from '../../../interface/interfacesGames/race';
import { ManagementInfoService } from '../../../services/management-info.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators} from '@angular/forms';
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

  ngOnInit() {///CAMBIAR EL 5 POR UN BUSCADOR DE 1 A CANTIDADRACES.LENGHT PARA QUE SELECCIONE ENTRE 1 Y N CANTIDAD DE CARRERAS TOTALES DE ESE A;O
  let year = this.getRandomNumber(this.inicioAnio,this.finanio);

  this.datos = this.infoF1.getRaceData(year,8);
}



  /// VER PARA PEDIR POR PARAMETRO PARA TENER UN RANGO DE A;OS PARA JUGAR
  inicioAnio = 1950;
  finanio = 2025;

  enteroAleatorio = 0;
  
/// FALTA FUNCION PARA BUSCAR UN NUMERO RANDOM DE CARRERAS, SE PUEDE USAR EL GETRANDOMNUMBER PERO HAY QUE FILTRAR LA CANTIDAD DE CARRERAS QUE TENGA DICHO YEAR.
  getRandomNumber(a: number, b: number) {
    this.enteroAleatorio = Math.floor(Math.random() * (b - a + 1)) + a;
    return this.enteroAleatorio;
  }
  
  /// Juego propiamente dicho
  renderGame() {
  this.conjuntoPilotos = [];
console.log('PRUEBA');
console.log(this.datos.length);
console.log('FINPRUEBA');

  this.getRandomNumber(0, this.datos.length);
  
  const indicesRelativos = [1, 2, 0, -1, -2, 3];
  const pilotosSet = new Set<string>();

  for (const offset of indicesRelativos) {
    const index = this.enteroAleatorio + offset;
    if (index >= 0 && index < this.datos.length) {
      const driver = this.datos[index].driver;
      if (driver?.name && driver?.lastName) {
        pilotosSet.add(driver.name + ' ' + driver.lastName);
      } else {
        console.log('Piloto nulo o incompleto en índice:', index);
      }
    }
  }

  this.conjuntoPilotos = Array.from(pilotosSet).slice(0, 4);///aca esta el problema de que se filtra mal ME PARECE, en algun CONJUNTOPILOTOS ESTA LA JODA

  this.anio = this.datos[this.enteroAleatorio].season;
  this.circuito = this.datos[this.enteroAleatorio].location;
  this.season = this.datos[this.enteroAleatorio].season;
  this.escuderia = this.datos[this.enteroAleatorio].driver.constructor;
  this.piloto = this.datos[this.enteroAleatorio].driver.name + ' ' + this.datos[this.enteroAleatorio].driver.lastName;
  this.nacionalidad = this.datos[this.enteroAleatorio].driver.nationality;
  this.raceName = this.datos[this.enteroAleatorio].raceName;

}

  //Info necesaria para las preguntas
  raceName = '';
  nacionalidad = '';
  season: string = '';
  jugar: boolean = false;
  anio = '';
  circuito = '';
  escuderia = '';
  companero = '';
  image = '';
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

  //Un enrutador para redirijir la pagina
  router = inject(Router);

  pistaUno() {
    this.puntosAGanar = this.puntosAGanar - 1;  
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

    this.datos = this.infoF1.getRaceData(this.getRandomNumber(this.inicioAnio,this.finanio),8);
    this.puntosAGanar = 3;
    this.getRandomNumber(0, this.datos.length);
  }

  respuesta(e: Event) {
    if (String(e) === this.piloto) {
      this.respuestaPiloto = true;
    }
  }

  startGame() {
    this.jugar = true;
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
          title: 'Correct!',
          html: `Correct! You gained: ${this.puntosAGanar} points to your stats`,
          animation: true,
          icon: 'success',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: 'Next Driver',
          cancelButtonText: 'Back to Home',
        }).then((result) => {
          if(result.value){
            this.winner();
          }else if( result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/home');
            ///this.timerComponent.detenerTimer(); REVISAR PORQUE NO CORTA
          }
        });
      
    } else {
        this.sigPiloto = false;
        this.pilAux = data;
        this.errorPiloto = true;
        this.actualizarPuntos("pierde");

      await  Swal.fire({
          title: 'Wrong!',
          html: `Correct answer is: ${this.piloto}. You gained 1 point on errors in your stats`,
          animation: true,
          icon: 'error',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: 'Next Driver',
          cancelButtonText: 'Back to Home',
        }).then((result) => {
          if(result.value){
            this.winner();
          }else if( result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/home');
            ///this.timerComponent.detenerTimer(); REVISAR POR QUE NO CORTA
          }
        });
      }
    }else{
      Swal.fire({
        title: 'ERROR',
        html: 'Error. Please select one driver.',
        icon: 'error',
      })
    }
  }
  
  backHome() {
    this.router.navigateByUrl('home');
    ///this.timerComponent.detenerTimer(); REVISAR POR QUE NO CORTA
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

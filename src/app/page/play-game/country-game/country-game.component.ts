import { Component, inject } from '@angular/core';
import { Race } from '../../../interface/interfacesGames/race';
import { NewPilosts } from '../../../interfaces/interfacesGames/new-pilosts';
import { F1InfoService } from '../../../services/f1-info.service';


@Component({
  selector: 'app-country-game',
  templateUrl: './country-game.component.html',
  styles: ``
})
export class CountryGameComponent {
  ngOnInit() {
    this.infoF1.getDrivers(this.renderNumberAnio()).subscribe({
      next: (data: any) => {
        this.drivers = data.MRData.DriverTable.Driver.map((driver: any) => ({
          driverId: driver.driverId,
          code: driver.code,
          PermanentNumber: driver.PermanentNumber,
          GivenName: driver.GivenName,
          FamilyName: driver.FamilyName,
          DateOfBirth: driver.DateOfBirth,
          Nationality: driver.Nationality,
          url: driver.url
          
        }));
        console.log(data)
      },
      error: (err) => console.error('Error al obtener los pilotos:', err)
    });
  }
  
  drivers:NewPilosts[] = [];
  //Traemos los datos y los guardamos en variables de tipo array
  infoF1=inject(F1InfoService);
  
  
  
  //variable para comenzar el juego y su funcion iniciadora
  starGame:boolean = false
  functionStarGame(){
    this.starGame=true
  }
  
  //Render un anio aleatorio para los datos del juego
  renderNumberAnio() {
    const anio =
      Math.floor(Math.random() * (this.finanio - this.inicioAnio + 1)) +
      this.inicioAnio;
    return anio.toString();
  }
  // anios de comienzo y fin de la aleterioridad
  inicioAnio = 1960;
  finanio = 2024;
  
}

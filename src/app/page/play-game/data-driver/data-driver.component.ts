import { Component, inject, OnInit } from '@angular/core';
import { PilotsService } from '../../../services/pilots.service';
import { NewPilosts } from '../../../interfaces/interfacesGames/new-pilosts';

@Component({
  selector: 'app-data-driver',
  templateUrl: './data-driver.component.html',
  styles: ``,
})
export class DataDriverComponent implements OnInit {
  ngOnInit(): void {
    this.services.getDrivers().subscribe({
      next: (drivers) => {
        this.driversLista = drivers;
        console.log(drivers);
        for (let index = 0; index < drivers.length; index++) {
          const element = drivers[index];
          console.log(element);
          alert('Entro');
        }
      },
      error: (e: Error) => {
        console.log(e.message);
        alert('No entro')
      },
    });
  }
  driversLista: NewPilosts[] = [];
  services = inject(PilotsService);
}

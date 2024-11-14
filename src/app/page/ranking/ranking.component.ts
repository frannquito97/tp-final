import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { ManagementInfoService } from '../../services/management-info.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styles: ``
})
export class RankingComponent implements OnInit {
  userList: Array<User> = [];

  constructor(private management:ManagementInfoService){}
ngOnInit() {
  this.userList = this.management.getUserArray();
  //FALTA PONER LOS PUNTOS POR CADA JUEGO, 1 RESPUESTA CORRECTA SUMA UN PUNTO, EL QUE MAS RESPUESTAS CORRECTAS TENGA EN X TIEMPO VA A ESTAR PRIMERO EN EL RANKING.
  
}
}

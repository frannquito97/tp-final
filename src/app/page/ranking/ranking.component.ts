import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styles: ``
})
export class RankingComponent implements OnInit {
  userList: Array<User> = [];

  constructor(private _userService:UserService){}
ngOnInit() {
  this._userService.getUsers().subscribe({
    next: (data) =>{
      this.userList = data;
    }
  });
  //FALTA PONER LOS PUNTOS POR CADA JUEGO, 1 RESPUESTA CORRECTA SUMA UN PUNTO, EL QUE MAS RESPUESTAS CORRECTAS TENGA EN X TIEMPO VA A ESTAR PRIMERO EN EL RANKING.
  
}
}

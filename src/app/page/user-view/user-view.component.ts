import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ManagementInfoService } from '../../services/management-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: ``
})
export class UserViewComponent implements OnInit{

  user: User = new User();

  constructor(private management:ManagementInfoService, private route: ActivatedRoute){}

ngOnInit(){
  let userId = Number(this.route.snapshot.paramMap.get('id'));

  if(userId){

    this.management.getById(userId).then((user: User) =>{
      this.user.id = user.id;

    })
    .catch(error => {
      console.error ('Error al buscar ID de user', error);
    });
  };
}
}
//TERMINAR DE REVISAR VIEW USER Y MYPROFILE
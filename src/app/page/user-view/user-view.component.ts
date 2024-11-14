import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ManagementInfoService } from '../../services/management-info.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: ``
})
export class UserViewComponent implements OnInit{

  user: User = new User();
  editingMode: boolean = false;
  updateUser: any = {};

  constructor(private management:ManagementInfoService,private http:HttpClient, private route: ActivatedRoute){}

ngOnInit(){
  let userId = Number(this.route.snapshot.paramMap.get('id'));

  if(userId){

    this.management.getById(userId).then(response =>{
      this.user = response;

    })
    .catch(error => {
      console.error ('Error al buscar user', error);
    });
  };
}

edit(): void{
this.editingMode = !this.editingMode;
}

saveChanges(): void{
  const url = `http://localhost/3000/users${this.user.id}`;
  this.http.put(url, this.updateUser).subscribe({
    next: () =>{
      this.user = {...this.updateUser};
      this.editingMode = false;
      alert('Datos actualizados');
    },
    error: () => {
      alert ('Error al actualizar');
    }
  })
}
}
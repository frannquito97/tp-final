import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ManagementInfoService } from '../../services/management-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styles: ``
})
export class ModifyUserComponent implements OnInit {

  user: User | null = new User;

  constructor(private managementService: ManagementInfoService, private route: ActivatedRoute){
    
  }
ngOnInit() {
  let userId = Number(this.route.snapshot.paramMap.get('id'));
   this.managementService.getById(userId)
   .then(response => {
    this.user = response;
   })
   .catch(error => {
    console.log(error);
   })
}
}
//seguir desde aca, tengo que cambiar los ID y ponerlos autoincremental asi pueden filtrarse y buscarse en el json de users, para mostrar y modificarlos
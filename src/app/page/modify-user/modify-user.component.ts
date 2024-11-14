import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { ManagementInfoService } from '../../services/management-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styles: ``
})
export class ModifyUserComponent implements OnInit {

  

  constructor(private managementService: ManagementInfoService, private route: ActivatedRoute){
    
  }
ngOnInit() {
  // let userId = Number(this.route.snapshot.paramMap.get('id'));
  //  this.managementService.getById(userId)
  //  .then(response => {
  //   this.user = response;
  //  })
  //  .catch(error => {
  //   console.log(error);
  //  })
}
}
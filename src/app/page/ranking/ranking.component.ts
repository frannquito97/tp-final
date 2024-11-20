import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Stat } from '../../interface/stat';
import { StatService } from '../../services/stat.service';
import { userRanking } from '../../interface/userRanking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styles: ``
})
export class RankingComponent implements OnInit {
  ranking: Stat[] = [];
  usersRanking: userRanking[] = [];

  constructor(private _statService: StatService, private _userService: UserService) { }
  ngOnInit() {
    this._statService.getRanking().subscribe({
      next: (data) => {
        this.ranking = data
        this.ranking.forEach(id => {
          this._userService.getUserData(id.id_user).subscribe({
            next: (info) => {
              let aux: userRanking = {
                name: info['name'],
                lastName: info['lastName'],
                username: info['username']
              }
              this.usersRanking.push(aux);
            }
          })

        })

      }


    });

  }
}

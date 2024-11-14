import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENT APP
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HomeComponent } from './page/home/home.component';
import { PlayGameComponent } from './page/play-game/play-game.component';
import { UserViewComponent } from './page/user-view/user-view.component';
import { WordGameComponent } from './page/play-game/word-game/word-game.component';
import { ModifyUserComponent } from './page/modify-user/modify-user.component';
import { RankingComponent } from './page/ranking/ranking.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  { path:'f1Games', component: LoginComponent},
  { path:'home', component: HomeComponent},
  { path:'play', component: PlayGameComponent },
  { path:'modifyUser', component: ModifyUserComponent},
  { path:'word-Game' , component:WordGameComponent},
  { path:'myProfile/:id', component: UserViewComponent },
  { path:'sign-in', component:SignInComponent},
  { path:'', redirectTo:'f1Games', pathMatch: 'full' },
  { path:'ranking', component: RankingComponent},
  /*{path:'view/id:', component}
  {path:'user/id:', component}
  {path:'user/id:', component}*/
  { path:'**' , component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

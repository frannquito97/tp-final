import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENT APP
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HomeComponent } from './page/home/home.component';
import { PlayGameComponent } from './page/play-game/play-game.component';
import { UserViewComponent } from './page/user-view/user-view.component';
import { LoginComponent } from './page/login/login.component';
import { WordGameComponent } from './page/play-game/word-game/word-game.component';

const routes: Routes = [
  { path:'home', component: HomeComponent},
  { path:'', redirectTo:'home', pathMatch: 'full' },
  { path:'play', component: PlayGameComponent },
  {path:'word-Game' , component:WordGameComponent},
  { path:'my-profile', component: UserViewComponent },
  { path:'f1Games', component: LoginComponent},
  /*{path:'modifyinfo', component: UserViewComponent},
  {path:'user/id:', component}
  {path:'user/id:', component}
  {path:'user/id:', component}*/
  { path:'**' , component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

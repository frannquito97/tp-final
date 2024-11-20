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
import { authGuard } from './utils/auth.guard';
import { DataDriverComponent } from './page/play-game/data-driver/data-driver.component';

const routes: Routes = [
  { path:'f1Games', component: LoginComponent},
  { path:'home', component: HomeComponent, canActivate: [authGuard]},
  { path:'play', component: PlayGameComponent , canActivate:[authGuard]},
  { path:'modifyUser', component: ModifyUserComponent, canActivate:[authGuard]},
  { path:'word-Game' , component:WordGameComponent, canActivate:[authGuard]},
  { path:'myProfile/:id', component: UserViewComponent, canActivate:[authGuard] },
  { path:'sign-in', component:SignInComponent},
  { path:'drivers', component:DataDriverComponent},
  { path:'', redirectTo:'f1Games', pathMatch: 'full' },
  { path:'ranking', component: RankingComponent, /* canActivate:[authGuard] */},
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

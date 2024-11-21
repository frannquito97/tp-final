import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENT APP
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HomeComponent } from './page/home/home.component';
import { UserViewComponent } from './page/user-view/user-view.component';
import { WordGameComponent } from './page/play-game/word-game/word-game.component';
import { RankingComponent } from './page/ranking/ranking.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { authGuard } from './utils/auth.guard';
import { DataDriverComponent } from './page/play-game/data-driver/data-driver.component';

const routes: Routes = [
  { path:'f1Games', component: LoginComponent},
  { path:'home', component: HomeComponent, canActivate: [authGuard]},
  { path:'play', component: WordGameComponent , canActivate:[authGuard]},
  { path:'word-Game' , component:WordGameComponent, canActivate:[authGuard]},
  { path:'myProfile/:id', component: UserViewComponent, canActivate:[authGuard] },
  { path:'sign-in', component:SignInComponent},
  { path:'drivers', component:DataDriverComponent},
  { path:'', redirectTo:'f1Games', pathMatch: 'full' },
  { path:'ranking', component: RankingComponent, /* canActivate:[authGuard] */},
  { path:'**' , component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

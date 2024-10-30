import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENT APP
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HomeComponent } from './page/home/home.component';
import { PlayGameComponent } from './page/play-game/play-game.component';
import { UserViewComponent } from './page/user-view/user-view.component';
import { RegisterUserComponent } from './page/register-user/register-user.component';

const routes: Routes = [
  { path:'home', component: HomeComponent},
  { path:'', redirectTo:'home', pathMatch: 'full' },
  { path:'play', component: PlayGameComponent },
  { path:'my-profile/:id', component: UserViewComponent },
  { path: 'singup', component: RegisterUserComponent},
  { path:'**' , component: NotFoundComponent },
  /*{path:'modifyinfo/:id', component: UserViewComponent},
  {path:'user/id:', component}
  {path:'user/id:', component}
  {path:'user/id:', component}*/
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

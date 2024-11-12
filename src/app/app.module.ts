import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HomeComponent } from './page/home/home.component';
import { PlayGameComponent } from './page/play-game/play-game.component';
import { UserViewComponent } from './page/user-view/user-view.component';
import { LoginComponent } from './page/login/login.component';
import { WordGameComponent } from './page/play-game/word-game/word-game.component';
import { RegisterComponent } from './page/register/register.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { ModifyUserComponent } from './page/modify-user/modify-user.component';
import { RankingComponent } from './page/ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    PlayGameComponent,
    UserViewComponent,
    LoginComponent,
    WordGameComponent,
    RegisterComponent,
    ModifyUserComponent,
    RankingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}

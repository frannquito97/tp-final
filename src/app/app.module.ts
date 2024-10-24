import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HomeComponent } from './page/home/home.component';
import { PlayGameComponent } from './page/play-game/play-game.component';
import { UserViewComponent } from './page/user-view/user-view.component';
import { LoginComponent } from './page/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    PlayGameComponent,
    UserViewComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

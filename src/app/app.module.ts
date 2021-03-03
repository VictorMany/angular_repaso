import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesListComponent } from './components/dishes-list/dishes-list.component';
///////////////////////////
// Módulo que nos permite hacer peticiones http
import { HttpClientModule } from '@angular/common/http';

// Ennvironment
import { environment } from '../environments/environment';

// Modulos de firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesListComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Conexión con un proyecto de firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // Modulo de autenticación con firebase
    AngularFireAuthModule,
    // Módulo para trabajar con la base de datos
    AngularFirestoreModule,
    // Módulo para alamcenar archivos en firebase
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {FirebaseService} from './services/firebase.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCNgHayQthW-mQ62CeKKiPoI8Jwk0yftnQ",
      authDomain: "fir-angular-auth-cdb4a.firebaseapp.com",
      projectId: "fir-angular-auth-cdb4a",
      storageBucket: "fir-angular-auth-cdb4a.appspot.com",
      messagingSenderId: "20746103398",
      appId: "1:20746103398:web:1aab449229526c216f1ba7"
    })
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

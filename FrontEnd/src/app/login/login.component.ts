import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignedIn = false


  constructor(private router: Router, public firebaseService: FirebaseService) {

  }

  ngOnInit(){

    if (localStorage.getItem('user') != null)
      this.isSignedIn = true
    else
      this.isSignedIn = false
  }

  async onSignup(email: string, password: string){
    try{
      await this.firebaseService.signup(email,password)
      if (this.firebaseService.isLoggedIn)
        this.isSignedIn = true
    } catch (err){
      alert("Falta")
    }
  }

  async onSignin(email: string, password: string){
    try{
      await this.firebaseService.signin(email,password)
      if (this.firebaseService.isLoggedIn)
        this.isSignedIn = true
    } catch (err){
      alert("Error al inciar sesión")
    }
  }

  handleLogout(){
    this.isSignedIn = false
  }

  signUpButton(){
    var change = document.getElementById("container") as HTMLInputElement;
    change.classList.add("right-panel-active");
  }

  signInButton(){
    var change = document.getElementById("container") as HTMLInputElement;
    change.classList.remove("right-panel-active");
  }

}

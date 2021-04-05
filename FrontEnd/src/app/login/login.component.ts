import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   @ViewChild('inputCorreo') inputCorreo;
   @ViewChild('inputContra') inputContra;

  datosUsuarioLoggedIn : any;

  displayName = "";
  email = "";
  password = "";
  errorMessage = ''; // validation error handle
  error: { name: string, message: string} = {name: '', message: ''}; // control error firebase

  constructor(private router: Router, private firebaseService: FirebaseService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    if (this.datosUsuarioLoggedIn != null) {
      this.firebaseService.signOut();
    }
  }

  ngOnInit(){
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }

validateFormRegister(displayName,email,password){
  if (displayName.length === 0 ) {
    this.errorMessage = "Please enter the name";
    return false;
  }
  if (email.length === 0 ) {
    this.errorMessage = "Please enter the email";
    return false;
  }
  if (password.length === 0 ) {
    this.errorMessage = "Please enter the password";
    return false;
  }
  if (password.length < 6) {
    this.errorMessage = "The password must be at least 6 characters";
    return false;
  }
  this.errorMessage = "";
  return true;
}

validateFormLogin(email,password){
  if (email.length === 0 ) {
    this.errorMessage = "Please enter the email";
    return false;
  }
  if (password.length === 0 ) {
    this.errorMessage = "Please enter the password";
    return false;
  }
  if (password.length < 6) {
    this.errorMessage = "The password must be at least 6 characters";
    return false;
  }
  this.errorMessage = "";
  return true;
}

onSignup(){
  this.clearErrorMessage();
  if (this.validateFormRegister(this.displayName,this.email, this.password)) {
    this.firebaseService.registerWithEmail(this.displayName,this.email, this.password)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 2500
      })
      this.inputCorreo.nativeElement.value = '';
      this.inputContra.nativeElement.value = '';
      this.delay(2500).then(any=>{
          this.signInButton();
      });
    }).catch(_error => {
      this.error = _error
      this.router.navigate(['/login'])
    })
  }
}

onSignin(){
  this.clearErrorMessage();
  if (this.validateFormLogin(this.email, this.password)) {
    this.firebaseService.loginWithEmail(this.email, this.password)
    .then(() => {
      this.router.navigate(['/inicio'])
    }).catch(_error => {
      this.error = _error
      this.router.navigate(['/login'])
    })
  }
}

onSigninGoogle(){
  this.clearErrorMessage();
  this.firebaseService.loginWithGoogle()
  .then(() => {
    this.router.navigate(['/inicio'])
  }).catch(_error => {
    this.error = _error
    this.router.navigate(['/login'])
  })
}


onSigninFacebook(){
  this.clearErrorMessage();
  this.firebaseService.loginWithFacebook()
  .then(() => {
    this.router.navigate(['/inicio'])
  }).catch(_error => {
    this.error = _error
    this.router.navigate(['/login'])
  })
}


async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log(""));
}

signUpButton(){
  this.clearErrorMessage();
  var change = document.getElementById("container") as HTMLInputElement;
  change.classList.add("right-panel-active");
}

signInButton(){
  this.clearErrorMessage();
  var change = document.getElementById("container") as HTMLInputElement;
  change.classList.remove("right-panel-active");
}

}

import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  authState: any = null;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.firebaseAuth.authState.subscribe((auth => {
      this.authState = auth;
    }))
  }

  registerWithEmail(email: string, password: string){
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      this.authState = user
    }).catch(error => {
      console.log(error)
      throw error
    })
  }

  loginWithEmail(email: string, password: string){
    return this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then((user)=>{
      this.authState = user
     localStorage.setItem('user',JSON.stringify(user))
    }).catch(error => {
      console.log(error)
      throw error
    })
  }

  loginWithGoogle(){
    return this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((user)=>{
      this.authState = user
     localStorage.setItem('user',JSON.stringify(user))
    }).catch(error => {
      console.log(error)
      throw error
    })
  }

  loginWithFacebook(){
    return this.firebaseAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((user)=>{
      this.authState = user
     localStorage.setItem('user',JSON.stringify(user))
    }).catch(error => {
      console.log(error)
      throw error
    })
  }


  signOut(): void
  {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user')
    this.router.navigate(['/login']);
  }

}

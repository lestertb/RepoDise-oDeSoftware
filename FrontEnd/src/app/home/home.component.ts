import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  datosUsuarioLoggedIn : any;
  // @Output() isLogout = new EventEmitter<void>()
  constructor(private router: Router, public firebaseService: FirebaseService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    if (this.datosUsuarioLoggedIn == null) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
  }

}

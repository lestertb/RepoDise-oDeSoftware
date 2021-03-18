import { Component, OnInit, Output, EventEmitter, Renderer2  } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  player=1; //1 for White, 2 for Black
  p1Score = 2;
  p2Score = 2;
  grid = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];

  datosUsuarioLoggedIn : any;
  // @Output() isLogout = new EventEmitter<void>()
  constructor(private router: Router, public firebaseService: FirebaseService, private renderer: Renderer2) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    if (this.datosUsuarioLoggedIn == null) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    var player0 = document.getElementById("p1") as HTMLInputElement;
    player0.classList.add("animateAreaScore");
    this.refreshGrid();
  }

  selectCell(row: number, col: number){
    if (this.grid[row][col] == 0) {
      var player1 = document.getElementById("p1") as HTMLInputElement;
      player1.classList.remove("animateAreaScore");

      var player2 = document.getElementById("p2") as HTMLInputElement;
      player2.classList.remove("animateAreaScore");


        if ((this.player == 1) && (this.grid[row][col]==0)) {
          this.p1Score ++;
          this.grid[row][col]=1;
          this.player=2;
          var turn = document.getElementById("colorTurn") as HTMLInputElement;
          turn.innerHTML = "Black Turn";

          player2.classList.add("animateAreaScore");

        } else if ((this.player==2) && (this.grid[row][col]==0)) {
          this.p2Score ++;
          this.grid[row][col]=2;
          this.player=1;
          var turn = document.getElementById("colorTurn") as HTMLInputElement;
          turn.innerHTML = "White Turn";

          player1.classList.add("animateAreaScore");
        }

        this.refreshGrid();
    }

  }

  refreshGrid(){
    for (var row = 0; row < 8; row++) {
       for (var col = 0; col < 8; col++) {

         if (this.grid[row][col]==0) {

           var color = document.getElementById("cell"+row+col) as HTMLInputElement;
           var child = color.children[0];
           this.renderer.setStyle(child, 'background-color', '#129104');

           } else if (this.grid[row][col]==1) { //1 for white

             var color = document.getElementById("cell"+row+col) as HTMLInputElement;
             var child = color.children[0];
             this.renderer.setStyle(child, 'background-color', '#FFFFFF');

           } else if (this.grid[row][col]==2) { //2 for black

             var color = document.getElementById("cell"+row+col) as HTMLInputElement;
             var child = color.children[0];
             this.renderer.setStyle(child, 'background-color', '#000000');
            }
         }
     }

  }

  resetGame() {

    for (var row = 0; row < 8; row++) {
       for (var col = 0; col < 8; col++) {
          this.grid[row][col] == 0;
          var color = document.getElementById("cell"+row+col) as HTMLInputElement;
          var child = color.children[0];
          this.renderer.setStyle(child, 'background-color', '#129104');
       }

     }
     this.grid = [
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 1, 2, 0, 0, 0],
       [0, 0, 0, 2, 1, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0]
     ];

     this.refreshGrid();

     this.player = 1;

     var turn = document.getElementById("colorTurn") as HTMLInputElement;
     turn.innerHTML = "White Turn";

     var player1 = document.getElementById("p1") as HTMLInputElement;
     player1.classList.remove("animateAreaScore");
     var player2 = document.getElementById("p2") as HTMLInputElement;
     player2.classList.remove("animateAreaScore");

     this.p1Score = 2;
     this.p2Score = 2;

     player1.classList.add("animateAreaScore");

  }


}

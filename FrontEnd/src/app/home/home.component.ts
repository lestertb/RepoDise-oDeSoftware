import { Component, OnInit, Renderer2  } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router, ActivatedRoute } from '@angular/router';
import { ModelJugada } from '../models/modelJugada';

//Services
import { PartidaService } from '../services/partida.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataJugada = new ModelJugada();
  actualGameID :any;
  infoPlayer1 = {
    id : '',
    nombre: '',
    p1Score : 2
  }
  infoPlayer2 = {
    id : '',
    nombre: '',
    p2Score : 2
  }
  player=1; //1 for White, 2 for Black
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
  constructor(private router: Router, public firebaseService: FirebaseService,
   private renderer: Renderer2,public partidaService: PartidaService, private _Activatedroute:ActivatedRoute) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    if (this.datosUsuarioLoggedIn == null) {
      this.router.navigate(['/login'])
    }
    this.infoPlayer1.id = this.datosUsuarioLoggedIn.user.uid;
    this.infoPlayer1.nombre = this.datosUsuarioLoggedIn.user.displayName;
    this.actualGameID = this._Activatedroute.snapshot.paramMap.get("idGame")
    this.infoPlayer2.id = this._Activatedroute.snapshot.paramMap.get("idPlayer2")
    this.infoPlayer2.nombre = this._Activatedroute.snapshot.paramMap.get("nombreJugador2")
  }

  ngOnInit(): void {
    var player0 = document.getElementById("p1") as HTMLInputElement;
    player0.classList.add("animateAreaScore");
    this.refreshGrid();
  }

  guardarMovimiento(){
    var tableroWMovimiento = {
      0:this.grid[0],
      1:this.grid[1],
      2:this.grid[2],
      3:this.grid[3],
      4:this.grid[4],
      5:this.grid[5],
      6:this.grid[6],
      7:this.grid[7]
    }

    this.dataJugada.idPartida = this.actualGameID
    this.dataJugada.Tablero = tableroWMovimiento;
    this.dataJugada.Jugador1 = this.infoPlayer1
    this.dataJugada.Jugador2 = this.infoPlayer2

    this.partidaService.putGuardarJugada(this.dataJugada)
        .subscribe(
          (data: any) =>{
            if(data){
              console.log(data);
            }
            else
               alert("Algo salió mal");
          }, err => {
            if (err.error)
              console.error(err);
          });
  }

  selectCell(row: number, col: number){
    if (this.grid[row][col] == 0) {
      var player1 = document.getElementById("p1") as HTMLInputElement;
      player1.classList.remove("animateAreaScore");

      var player2 = document.getElementById("p2") as HTMLInputElement;
      player2.classList.remove("animateAreaScore");


        if ((this.player == 1) && (this.grid[row][col]==0)) {
          this.infoPlayer1.p1Score ++;
          this.grid[row][col]=1;
          this.guardarMovimiento();
          this.player=2;
          var turn = document.getElementById("colorTurn") as HTMLInputElement;
          turn.innerHTML = "Black Turn";

          player2.classList.add("animateAreaScore");

        } else if ((this.player==2) && (this.grid[row][col]==0)) {
          this.infoPlayer2.p2Score ++;
          this.grid[row][col]=2;
          this.guardarMovimiento();
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

     this.infoPlayer1.p1Score = 2;
     this.infoPlayer2.p2Score = 2;

     player1.classList.add("animateAreaScore");

  }


}

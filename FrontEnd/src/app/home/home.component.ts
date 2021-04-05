import { Component, OnInit, Renderer2  } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router, ActivatedRoute } from '@angular/router';
import { ModelJugada } from '../models/modelJugada';
import Swal from 'sweetalert2';

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
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
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




  actualizarPartida(tipo:number){
    var tablero = {
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
    this.dataJugada.Tablero = tablero;
    this.dataJugada.Jugador1 = this.infoPlayer1
    this.dataJugada.Jugador2 = this.infoPlayer2

    if (tipo == 1) {
      this.partidaService.putGuardarJugada(this.dataJugada)
          .subscribe(
            (data: any) =>{
              if(data){
                //console.log(data);
              }
              else
                 alert("Algo salió mal");
            }, err => {
              if (err.error)
                console.error(err);
            });
    }else if (tipo ==2){
      this.partidaService.putResetPartida(this.dataJugada)
          .subscribe(
            (data: any) =>{
              if(data){
                //console.log(data);
              }
              else
                 alert("Algo salió mal");
            }, err => {
              if (err.error)
                console.error(err);
            });
    }

  }

  pintarEntre(){
    for (var row = 0; row < 8; row++) {
       for (var col = 0; col < 8; col++) {

         //Pintar negras 1 salto
         if (this.grid[row][col] == 2) {
           //Derecha-Izquierda
           if (this.grid[row][col-1] == 1 && this.grid[row][col+1] == 1) {
             this.grid[row][col] = 1;
           }
           //Arriba-Abajo
           else if (this.grid[row-1][col] == 1 && this.grid[row+1][col] == 1) {
             this.grid[row][col] = 1;
           }
           //Diagonal
           else if (this.grid[row-1][col-1] == 1 && this.grid[row+1][col+1]) {
             this.grid[row][col] = 1;
           }
         }
         //Pintar blancas 1 salto
         if (this.grid[row][col] == 1) {
           //Derecha-Izquierda
           if (this.grid[row][col-1] == 2 && this.grid[row][col+1] == 2) {
             this.grid[row][col] = 2;
           }
           //Arriba-Abajo
           else if (this.grid[row-1][col] == 2 && this.grid[row+1][col] == 2) {
             this.grid[row][col] = 2;
           }
           //Diagonal
           else if (this.grid[row-1][col-1] == 2 && this.grid[row+1][col+1]) {
             this.grid[row][col] = 2;
           }
         }

       }

      }
  }

  verificarMovida(rowParam: number, colParam: number){
    for (var row = 0; row < 8; row++) {
       for (var col = 0; col < 8; col++) {
         //Jugador1
         if (this.grid[row][col]==1) {
            //Derecha-Izquierda
           if (
           (this.player == 1 && this.grid[rowParam][colParam] == 0)
           && (rowParam == row && colParam == (col-2))
           && this.grid[rowParam][col-1] == 2 || colParam == (col+2)
           && this.grid[rowParam][col+1] == 2 && this.player == 1 && this.grid[rowParam][colParam-2] == 1
           ) return true;
           //Arriba-Abajo
           else if (
           (this.player == 1 && this.grid[rowParam][colParam] == 0)
           && (colParam == col && rowParam == (row-2))
           && this.grid[colParam][row-1] == 2 || rowParam == (row+2)
           && this.grid[colParam][row+1] == 2 && this.player == 1
           ){
             return true;
           }
           //Diagonal
           else if (
           this.player == 1 && this.grid[rowParam][colParam] == 0
           && colParam == col-2 && rowParam == (row-2) && this.grid[row-1][col-1] == 2
           ) return true;

          //Jugador2
         }else if (this.grid[row][col]==2) {
           //Derecha-Izquierda
          if (
          (this.player == 2 && this.grid[rowParam][colParam] == 0)
          && (rowParam == row && colParam == (col-2))
          && this.grid[rowParam][col-1] == 1 || colParam == (col+2)
          && this.grid[rowParam][col+1] == 1 && this.player == 2 && this.grid[rowParam][colParam-2] == 2
          ) {return true;}
          //Arriba-Abajo
          else if (
          (this.player == 2 && this.grid[rowParam][colParam] == 0)
          && (colParam == col && rowParam == (row-2))
          && this.grid[colParam][row-1] == 1 || rowParam == (row+2)
          && this.grid[colParam][row+1] == 1 && this.player == 2
          ) {
           return true;
         }
          //Diagonal
          else if (
          this.player == 2 && this.grid[rowParam][colParam] == 0
          && colParam == col-2 && rowParam == (row-2) && this.grid[row-1][col-1] == 1
          ) return true;

         }

       }
    }

    return false
  }

  moverAutomatico(){
    console.log("Turno de la maquina");
  }

  selectCell(row: number, col: number){
    if (this.infoPlayer2.nombre != "Maquina") {
      if (this.grid[row][col] == 0) {
        var player1 = document.getElementById("p1") as HTMLInputElement;
        player1.classList.remove("animateAreaScore");

        var player2 = document.getElementById("p2") as HTMLInputElement;
        player2.classList.remove("animateAreaScore");

          if ((this.player == 1) && (this.grid[row][col]==0) && (this.verificarMovida(row,col))) {
            this.infoPlayer1.p1Score ++;
            this.grid[row][col]=1;
            this.pintarEntre();
            this.actualizarPartida(1);
            this.player=2;
            var turn = document.getElementById("colorTurn") as HTMLInputElement;
            turn.innerHTML = "Turno de: "+this.infoPlayer2.nombre;

            player2.classList.add("animateAreaScore");
            this.refreshGrid();
            if (this.infoPlayer1.p1Score > 32) {
              Swal.fire({
                icon: 'success',
                title: 'Felicidades el ganador es:' + this.infoPlayer1.nombre,
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 2500
              })
            }else if (this.infoPlayer1.p1Score == 32 && this.infoPlayer2.p2Score == 32) {
              Swal.fire({
                icon: 'success',
                title: 'Empate',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 2500
              })
            }

          } else if ((this.player==2) && (this.grid[row][col]==0) && (this.verificarMovida(row,col))) {
            this.infoPlayer2.p2Score ++;
            this.grid[row][col]=2;
            this.pintarEntre();
            this.actualizarPartida(1);
            this.player=1;
            var turn = document.getElementById("colorTurn") as HTMLInputElement;
            turn.innerHTML = "Turno de: "+this.infoPlayer1.nombre;

            player1.classList.add("animateAreaScore");
            this.refreshGrid();
            if (this.infoPlayer2.p2Score > 32) {
              Swal.fire({
                icon: 'success',
                title: 'Felicidades el ganador es:' + this.infoPlayer2.nombre,
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 2500
              })
            }else if (this.infoPlayer1.p1Score == 32 && this.infoPlayer2.p2Score == 32) {
              Swal.fire({
                icon: 'success',
                title: 'Empate',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 2500
              })
            }
            this.pintarEntre();
          }else{

            Swal.fire({
              text: 'Jugada no permitida',
              //target: '#custom-target',
              customClass: {
                container: 'position-absolute'
              },
              toast: true,
              position: 'bottom-right',
              timer: 1000
            })

            if (this.player == 1)
              player1.classList.add("animateAreaScore");
            if (this.player == 2)
              player2.classList.add("animateAreaScore");
            this.refreshGrid();
          }
          this.pintarEntre();
      }

    }else {
      this.moverAutomatico();
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
             this.renderer.setStyle(child, 'background-color', '#000000');

           } else if (this.grid[row][col]==2) { //2 for black

             var color = document.getElementById("cell"+row+col) as HTMLInputElement;
             var child = color.children[0];
             this.renderer.setStyle(child, 'background-color', '#FFFFFF');
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
       [0, 0, 0, 2, 1, 0, 0, 0],
       [0, 0, 0, 1, 2, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0]
     ];

     this.refreshGrid();

     this.player = 1;

     var turn = document.getElementById("colorTurn") as HTMLInputElement;
     turn.innerHTML = "Turno de: "+this.infoPlayer1.nombre;

     var player1 = document.getElementById("p1") as HTMLInputElement;
     player1.classList.remove("animateAreaScore");
     var player2 = document.getElementById("p2") as HTMLInputElement;
     player2.classList.remove("animateAreaScore");

     this.infoPlayer1.p1Score = 2;
     this.infoPlayer2.p2Score = 2;

     player1.classList.add("animateAreaScore");

     this.actualizarPartida(2);

  }


}

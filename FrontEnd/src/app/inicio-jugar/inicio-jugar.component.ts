import { Component, OnInit } from '@angular/core';
import { PartidaService } from '../services/partida.service';
import { ModelPartida } from '../models/modelPartida';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio-jugar',
  templateUrl: './inicio-jugar.component.html',
  styleUrls: ['./inicio-jugar.component.scss']
})
export class InicioJugarComponent implements OnInit {

  tipoPartida = "1";

  dataPartida = new ModelPartida();

  datosUsuarioLoggedIn : any;

  idsAuto = 0;

  idGameCreated:any;

  constructor(public partidaService: PartidaService,private router: Router) { }

  ngOnInit(): void {
  }

  cambioPartida(){
    var selectTipo = document.getElementById("partidas") as HTMLInputElement;
    this.tipoPartida = selectTipo.value;
  }

  llenarDatosPartida(){
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    this.dataPartida.idJugador1 = this.datosUsuarioLoggedIn.user.uid
    this.dataPartida.nombreJugador1 = this.datosUsuarioLoggedIn.user.displayName
    this.idsAuto ++;
    this.dataPartida.idJugador2 = this.idsAuto.toString();
  }

  crearPartida(form){
    if (form.valid) {
      this.llenarDatosPartida()
      this.partidaService.postPartida(this.dataPartida)
          .subscribe(
            (data: any) =>{
              if(data){
                this.idGameCreated = data.idGame
                this.router.navigate(['/home', this.idGameCreated, this.idsAuto, this.dataPartida.nombreJugador2],{skipLocationChange: true})
                alert(data.mensaje);
              }
              else
                 alert("Algo salió mal");
            }, err => {
              if (err.error)
                console.error(err);
            });
    }else{
      alert("Digite el nombre del jugador 2")
    }
  }

}

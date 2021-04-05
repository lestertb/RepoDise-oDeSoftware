import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelPartida } from '../models/modelPartida';
import { ModelJugada } from '../models/modelJugada';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  ip: string = 'localhost';
  port: string = '3000';
  urlRoot: string = `http://${this.ip}:${this.port}/routesFirebase`;

  constructor(public http: HttpClient) { }

  postPartida(
      data: ModelPartida
    ) {
      return this.http.post(`${this.urlRoot}/Partida`, data);
    }

  putGuardarJugada(
    data: ModelJugada
  ){
    return this.http.put(`${this.urlRoot}/guardarJugada`, data);
  }

  getPartidaXID(
      idPartida: string
    ) {
      return this.http.get(`http://${this.ip}:${this.port}/routesFirebase/PartidaXID?idPartida=${idPartida}`);
    }


}

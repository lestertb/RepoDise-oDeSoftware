import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TableroService {

  ip: string = 'localhost';
  port: string = '3000';
  urlRoot: string = `http://${this.ip}:${this.port}`;

  constructor(public http: HttpClient) { }

  getTablero(
  ) {
    return this.http.get(`${this.urlRoot}/test`);
  }



}

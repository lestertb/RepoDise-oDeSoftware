import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {LobbyComponent} from './lobby/lobby.component'
import {InicioJugarComponent} from './inicio-jugar/inicio-jugar.component'

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home/:idGame/:idPlayer2/:nombreJugador2', component: HomeComponent},
  { path: 'inicio', component: InicioJugarComponent },
  { path: 'lobby', component: LobbyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  cola = [];
  max;
  length;
  name: string;
  empezado: Boolean = false;
  finalizado: boolean = false;
  numRondas: number = 0;
  rondas: number = 0;

  constructor(private adminService: AdminService, private router: Router, private component: ComponentsService, 
    private events: EventsService, private torneoService: TorneoService) { }

  ngOnInit() {
    this.name = this.router.url.split('/')[2];
    if(this.name.includes("%20")){
      this.name = unescape(this.name);
    }

    this.adminService.setName(this.name);
    this.adminService.getCola().subscribe((data) => {
      this.cola = data.cola;
      this.length = data.length;
      this.max = data.max;
      this.empezado = data.torneoIniciado;
      this.numRondas = data.numRondas;
      this.rondas = data.rondas;
      this.finalizado = data.finalizado
    });

    this.events.getObservable().subscribe((data) => {
      if (data.topic == "nuevoJugadorCola" && data.torneo == this.name)
        this.cola.push(data.jugador);

      else if (data.topic == "respondidoJugadorCola" && data.torneo == this.name){
        this.cola.forEach(jugador => {
          if (jugador.username == data.jugador){
            let i = this.cola.indexOf(jugador);
            this.cola.splice(i, 1);
          }
        })
      }
    })
  }

  empezarPrevia(){
    if (this.length > 3){
      this.adminService.empezarPrevia().subscribe(data => {
        this.empezado = true;
        this.component.presentAlert(data.message);
      })
    }

    else
      this.component.presentAlert("Hay que ser como mínimo 4 para empezar el torneo");
  }

  finalizarRonda(){
    if (this.length % 4 == 0){
      this.adminService.finalizarRonda().subscribe(data => {
        this.component.presentAlert(data.message);
        this.rondas++;
        if (this.rondas > this.numRondas) 
          this.finalizado = true;
          
      }, error => {
        if (error.status == 409)
          this.component.presentAlert(error.error.message);
      })
    }

    else
      this.component.presentAlert("Hay que ser un múltiplo de 4 para poder finalizar una ronda");
  }

  acceptPlayer(username: string){
    /* if(this.length < this.max){
      this.adminService.acceptPlayers({user: username, accept: true}).subscribe((data) => {
        this.component.presentAlert(data.message);
      })
    } else {
      this.component.presentAlert("El torneo ya está lleno");
    } */
    this.adminService.acceptPlayers({user: username, accept: true}).subscribe((data) => {
      this.component.presentAlert(data.message);
    })
  }

  rejectPlayer(username: string){
    this.adminService.acceptPlayers({user: username, accept: false}).subscribe((data) => {
      this.component.presentAlert(data.message);
    })
  }
}

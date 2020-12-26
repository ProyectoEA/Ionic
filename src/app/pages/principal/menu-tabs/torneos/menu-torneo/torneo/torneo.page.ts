import { EventsService } from '../../../../../../services/events.service';
import { ComponentsService } from '../../../../../../services/components.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../../../../../services/torneo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.page.html',
  styleUrls: ['./torneo.page.scss'],
})
export class TorneoPage implements OnInit {

  torneo;
  name;
  isAdmin;
  players;
  joined: boolean;
  
  constructor(private torneoService: TorneoService, private route: ActivatedRoute, private component: ComponentsService, 
              private events: EventsService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.name = paramMap.get('name');
      this.torneoService.getTorneo(this.name).subscribe(data =>{
        this.isAdmin = data.isAdmin;
        this.joined = data.joined;
        this.torneo = data.torneo;
        this.players = data.torneo.players;
      });
    });
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "new-player") {
        this.route.paramMap.subscribe(paramMap => {
          this.name = paramMap.get('name');
          this.torneoService.getTorneo(this.name).subscribe(data =>{
            this.joined = data.joined;
            this.torneo = data.torneo;
            this.players = data.torneo.players;
          });
        });
      }
    });
  }

  joinTorneo(){
    this.torneoService.joinTorneo(this.name).subscribe(() => {
      this.events.publish({"topic":"new-player"});
      this.component.presentAlert("Te has unido a " + this.torneo.name);
    }, (error)=>{
      console.log(error);
      this.component.presentAlert("No has podido unirte");
    })
  }

  goAdmin(){
    this.router.navigateByUrl("torneo/"+this.name+"/admin");
  }
}

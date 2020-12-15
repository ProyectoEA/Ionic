import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { EventsService } from 'src/app/services/events.service';
import { MenuController } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: User;
  usuarios: User[];
  numNotificaciones: number = 0;
  constructor(private userService: UserService, private authService: AuthService, private router: Router, private events: EventsService,
    private menu: MenuController, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.userService.getMyUser().subscribe((data:any) => {
      this.usuario = data;
      this.events.connectSocket(data._id, data.username);
    });

    this.notificationsService.getMyNotifications().subscribe(data =>{
      this.usuario.notifications = data.notifications;
      this.numNotificaciones = this.usuario.notifications.length;
    });

    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "updateUser") {
        this.usuario = data.user;
      }
      else if (data.topic == "loginUser"){
        this.notificationsService.getMyNotifications().subscribe(data =>{
          this.usuario.notifications = data.notifications;
          this.numNotificaciones = this.usuario.notifications.length;
        });
        
        this.userService.getMyUser().subscribe((data:any) => {
          this.usuario = data;
          this.events.connectSocket(data._id, data.username);
          this.events.publish({
            "topic": "updateUser",
            "user": this.usuario
          })
        });
      }
    }) 
  }

  ionViewWillLeave(){
    this.menu.close('first');
  }

  logout(){
    this.authService.signout().subscribe(data =>{
      localStorage.clear();
      this.events.disconnectSocket();
      this.menu.close('first');
      this.router.navigate(['/auth/login']);
    })
  }

  goPerfil(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.usuario
      }
    };
    this.menu.close('first');
    this.router.navigate(['/principal/perfil'], navigationExtras);
  }

  goTorneos(){
    this.menu.close('first');
    this.router.navigate(['/principal/my-torneos']);
  }

  goPartidos(){
    this.menu.close('first');
  }

  goAmigos(){
    this.menu.close('first');
    this.router.navigate(['/principal/amigos']);
  }

  goInfo(){
    this.menu.close('first');
    this.router.navigate(['/principal/sobrenosotros']);
  }

  goNotificaciones(){
    this.menu.close('first');
    let navigationExtras: NavigationExtras = {
      state: {
        notifications: this.usuario.notifications
      }
    };
    this.router.navigate(['/principal/notificaciones'], navigationExtras);
  }
}

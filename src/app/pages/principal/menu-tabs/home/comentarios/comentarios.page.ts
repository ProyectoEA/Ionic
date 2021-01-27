import { Component, OnInit } from '@angular/core';
import {PublicacionesService} from '../../../../../services/publicaciones.service';
import {Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  id: string;
  comentarios: [];
  message = "";
  
  constructor(private publicacionesService: PublicacionesService, private router: ActivatedRoute){}

  ngOnInit() {
    this.router.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      console.log("comentario id: ", this.id);
      this.publicacionesService.getComments(this.id).subscribe(data => {
        this.comentarios = data.comments;
      });     
    });
  
  }

  enviarComment(event){
    if (event.keyCode == 13) {
      event.preventDefault();
      this.sendComment();
    }
  };

  sendComment(){
    if (this.message != ""){
      let info = {
        publicacion: this.id,
        comentario : this.message
      }

      this.publicacionesService.addComment(info).subscribe(data => {
        console.log("Data", data);
        this.message = "";
      })
    } 
  }

  



}

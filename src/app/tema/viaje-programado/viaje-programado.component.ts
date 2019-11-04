import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-viaje-programado',
  templateUrl: './viaje-programado.component.html',
  styleUrls: ['./viaje-programado.component.css']
})
export class ViajeProgramadoComponent implements OnInit {
  detalle:any;
  preguntas:any;
  
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  init() {
    var tag = document.createElement('script');
    tag.src = '../../../assets/js/initslider-1.js';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  ngOnInit() {
    this.init();
    window.scrollTo(0, 0);
  /* Capturamos el id */
  this.activatedRoute.params.subscribe( params =>{
    this.db.getViajeProgramadoByKey(params['id']).subscribe( data => 
      {
        this.detalle=data;
        console.log('Este es el detalle:',this.detalle);
      });
    
    this.db.getViajeProgramadoPreguntas(params['id']).subscribe( (data:any) => 
      {
        this.preguntas=data;
        console.log('Este es el detalle de las preguntas:',this.preguntas);
        $(document).ready(function() {
          $(".accordion-titulo").click(function(e){
            e.preventDefault();
            var contenido=$(this).next(".accordion-content");
            if(contenido.css("display")=="none"){ //open    
              contenido.slideDown(0);     
              $(this).addClass("open");
            }
            else{ //close   
              contenido.slideUp(0);
              $(this).removeClass("open");  
            }
            });
        });
      });

  });
    
  }

}

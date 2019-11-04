import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-circuito-detalle',
  templateUrl: './circuito-detalle.component.html',
  styleUrls: ['./circuito-detalle.component.css']
})
export class CircuitoDetalleComponent implements OnInit {
detalle:any;
dias:any[];
slider_imgs:any[]=[
  {
    id: '',
    url: 'assets/imagenes/circuito.png'
  },
  {
    id: '',
    url: 'assets/imagenes/29001.jpeg'
  },
  {
    id: '',
    url: 'assets/imagenes/29002.jpg'
  },
  {
    id: '',
    url: 'assets/imagenes/29003.jpg'
  },
  {
    id: '',
    url: 'assets/imagenes/29004.jpg'
  },
  {
    id: '',
    url: 'assets/imagenes/29005.jpg'
  }
];
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
    
      this.db.getCircuitoTourByKey(params['id']).subscribe( data => 
        {
          this.detalle=data;
          console.log('Este es el detalle:',this.detalle);
        });
      this.db.getCircuitoTourDias(params['id']).subscribe( (data:any) => 
        {
          this.dias=data;
          console.log('Este es el detalle de los Dias:',this.dias);
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

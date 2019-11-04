import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  Funciones:any;
  Juntas_Directivas:any;
  constructor(
    public db:DatabaseService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.TodaslasFunciones ();

    this.JuntaDirectiva ();
  }

  TodaslasFunciones () {
    this.db.getallDirceturFunciones().subscribe(res=>{
      this.Funciones=res;
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
  }

  JuntaDirectiva () {
    this.db.getallDirceturJuntaDirectiva().subscribe(res=>{
      this.Juntas_Directivas=res;
    });
  }

}

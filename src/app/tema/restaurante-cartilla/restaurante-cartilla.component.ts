import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-restaurante-cartilla',
  templateUrl: './restaurante-cartilla.component.html',
  styleUrls: ['./restaurante-cartilla.component.css']
})
export class RestauranteCartillaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
    if($(window).width()>=1024){
      $('.fondo-azul-cartilla').addClass('sticky-top');
    }else{
      $('.fondo-azul-cartilla').removeClass('sticky-top');
      }

      $(".accordion").click(function(e){
        e.preventDefault();
        var contenido=$(this).next(".panel");
        if(contenido.css("display")=="none"){ //open    
          contenido.slideDown(250);     
          $(this).addClass("active");
          contenido.css("display","block");
        }
        else{ //close   
          contenido.slideUp(250);
          $(this).removeClass("active");
          contenido.css("display","none");
        }
        });
  }

}

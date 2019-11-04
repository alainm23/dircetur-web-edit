import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-transparenciainstitucional',
  templateUrl: './transparenciainstitucional.component.html',
  styleUrls: ['./transparenciainstitucional.component.css']
})
export class TransparenciainstitucionalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);

    $(document).ready(function() {
      function clickcaja(e) {
        var lista = $(this).find("ul"),
        triangulo = $(this).find("span:last-child");
        e.preventDefault();
        //lista.is(":hidden") ? $(this).find("ul").show() : $(this).find("ul").hide();
      $(this).find("ul").toggle();
        if(lista.is(":hidden")) {
        triangulo.removeClass("triangulosup").addClass("trianguloinf");
        }
        else {
        triangulo.removeClass("trianguloinf").addClass("triangulosup");
        }
      }
      function clickli(e) {
        var texto = $(this).text(),
        seleccionado = $(this).parent().prev(),
        lista = $(this).closest("ul"),
        triangulo = $(this).parent().next();
        e.preventDefault();
        e.stopPropagation();    
        seleccionado.text(texto);
        lista.hide();
        triangulo.removeClass("triangulosup").addClass("trianguloinf");
      }
    $(".cajaselect").click(clickcaja);
    $(".cajaselect").on("click", "li", clickli);
    }); 
  }

}

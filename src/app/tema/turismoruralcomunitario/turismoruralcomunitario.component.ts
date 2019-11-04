import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-turismoruralcomunitario',
  templateUrl: './turismoruralcomunitario.component.html',
  styleUrls: ['./turismoruralcomunitario.component.css']
})
export class TurismoruralcomunitarioComponent implements OnInit {
  Viajes:any;
  constructor(
    public db:DatabaseService,
    public route: Router,
  ) { }

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
    
    this.TodoslosTourRural ();
  }

  TodoslosTourRural () {
    this.db.getallTurismoRural().subscribe(res=>{
      this.Viajes=res;
    });
  }

  goTurismoRural (id:string) {
    this.route.navigate (["/viaje-rural/" + id]);
  }

}

import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu:string="active";
  Categorias:any;
  constructor(public route: Router,
              public utils: UtilsService,
              public db:DatabaseService) { }

  ngOnInit() {
    this.TraerCategoriasBlogs();
  }

  TraerCategoriasBlogs () {
    this.db.getallCats().subscribe(res=>{
      this.Categorias=res;
      console.log('categorias del blog',res);
    });
  }

  activarMenuinterno ()
  {
    if (this.menu=="active") {
      $('.mostrar-menu').show(500);
      $('.derecha-menu').css({'transform': 'translate3d(-10%,0,0)'});
      this.menu="click";
      }else if (this.menu=="click"){
      $('.mostrar-menu').hide(500);
      $('.derecha-menu').css({'transform': 'translate3d(0,0,0)'});
      this.menu="active";
      }
  }

  goBlogs (id:string) {
    this.route.navigate (["/blogs/" + id]);
  }

  gohome () {
    this.route.navigate (["/home"]);
  }

  goSobreDIR () {
    this.route.navigate (["/sobre-nosotros"]);
  }

  goTransparenciaInst () {
    this.route.navigate (["/transparencia-institucional"]);
  }
  
  goCircuitosTuristicos () {
    this.route.navigate (["/circuitos-turisticos"]);
  }
  
  goBoletoTuristico () {
    this.route.navigate (["/boleto-turistico"]);
  }
  
  goTurismoRural () {
    this.route.navigate (["/turismo-rural-comunitario"]);
  }
  
  goTurismoSocial () {
    this.route.navigate (["/turismo-social"]);
  }
  
  goTurismo () {
    this.route.navigate (["/turismo"]);
  }

  goComercioExterior () {
    this.route.navigate (["/comercio-exterior"]);
  }

  goArtesania () {
    this.route.navigate (["/artesania"]);
  }

  cambio_idioma (idioma: any) {
    this.utils.ElIdioma = idioma;
  }
/*
  goNoticias () {
    this.route.navigate (["/noticias"]);
  }

  goEventos () {
    this.route.navigate (["/eventos"]);
  }

  goProyectosEspeciales () {
    this.route.navigate (["/proyectos-especiales"]);
  }
*/
  goContacto () {
    this.route.navigate (["/contacto"]);
  }
}

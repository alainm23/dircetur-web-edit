import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { UtilsService } from '../../services/utils.service';
import { DialogTextComponent } from '../../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../../dialogs/dialog-image/dialog-image.component';
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu:string="active";
  Categorias:any;
  etiquetas: any;
  imagenes: any;
  constructor(public route: Router,
              public utils: UtilsService,
              public db:DatabaseService,
              private dialog: MatDialog) { }

  ngOnInit() {
    
    this.TraerCategoriasBlogs();

    let idioma: string;
    idioma = localStorage.getItem("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    this.db.getPaginaWebEtiquetas ('header_' + idioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.db.getPaginaWebEtiquetas ('header').subscribe ((res) => {
      this.imagenes = res;
      console.log ("res", res);
    });

    this.utils.idioma.subscribe((nextValue: string) => {
      console.log ("Next Idioma", nextValue);
      /* subscribirme */
      this.db.getPaginaWebEtiquetas ('header_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
    });

  }

  openDialog (etiqueta_key: string, etiqueta_valor: string, tipo_entry: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '500px';
    dialogConfig.width = '600px';

    let idioma: string;
    idioma = localStorage.getItem ("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    dialogConfig.data = {
      etiqueta_key: etiqueta_key,
      etiqueta_valor: etiqueta_valor,
      tipo_entry: tipo_entry,
      doc: 'header',
      idioma: idioma
    };

    this.dialog.open (DialogTextComponent, dialogConfig);
  }

  openDialogImagen (etiqueta_key: string, etiqueta_valor: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      etiqueta_key: etiqueta_key,
      etiqueta_valor: etiqueta_valor
    };

    this.dialog.open (DialogImageComponent, dialogConfig);
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

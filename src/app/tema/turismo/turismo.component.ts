import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import * as $ from 'jquery';
import { DialogTextComponent } from '../../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../../dialogs/dialog-image/dialog-image.component';
import { MatDialog, MatDialogConfig } from "@angular/material"

@Component({
  selector: 'app-turismo',
  templateUrl: './turismo.component.html',
  styleUrls: ['./turismo.component.css']
})
export class TurismoComponent implements OnInit {


  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    public utils: UtilsService,
    private dialog: MatDialog,
  ) { }
  init() {
    var tag = document.createElement('script');
    tag.src = '../../../assets/js/flickity.min.js';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var tag2 = document.createElement('script');
    tag2.src = '../../../assets/js/initflickity.js';
    var firstScriptTag2 = document.getElementsByTagName('script')[0];
    firstScriptTag2.parentNode.insertBefore(tag2, firstScriptTag2);
  }
  ngOnInit() {
    this.init();
    window.scrollTo(0, 0);

    /*$(document).on("scroll", function(){
      var desplazamientoActual = $(document).scrollTop();
      if(desplazamientoActual > 2400)
      {
          function count(){
          var counter = { var: 0 };
          TweenMax.to(counter, 3, {
          var: 1285, 
          onUpdate: function () {
          var number = Math.ceil(counter.var);
          $('.counter').html(number);
          if(number === counter.var){ count.kill(); }
          },
          onComplete: function(){
          count();
          },    
          ease:Circ.easeOut
          });
          }
          count();
      }
    });*/

    let idioma: string;
    idioma = localStorage.getItem("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    this.db.getPaginaWebEtiquetas ('turismo_' + idioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.db.getPaginaWebEtiquetas ('turismo').subscribe ((res) => {
      this.imagenes = res;
      console.log ("res", res);
    });

    this.utils.idioma.subscribe((nextValue: string) => {
      console.log ("Next Idioma", nextValue);
      /* subscribirme */
      this.db.getPaginaWebEtiquetas ('turismo_' + nextValue).subscribe ((res) => {
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
      doc: 'turismo',
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


  goAlojamiento () {
    this.route.navigate (["/alojamiento-cartilla"]);
  }

  goRestaurante () {
    this.route.navigate (["/restaurante-cartilla"]);
  }

  goAgencia () {
    this.route.navigate (["/agencia-cartilla"]);
  }

  goGuia () {
    this.route.navigate (["/guia-cartilla"]);
  }
  
}

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DialogTextComponent } from '../../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../../dialogs/dialog-image/dialog-image.component';
import { DatabaseService } from '../../../services/database.service';
import { MatDialog, MatDialogConfig } from "@angular/material"

import { UtilsService } from '../../services/utils.service'; 

@Component({
  selector: 'app-boletoturistico',
  templateUrl: './boletoturistico.component.html',
  styleUrls: ['./boletoturistico.component.css']
})
export class BoletoturisticoComponent implements OnInit {


  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    private dialog: MatDialog,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    let idioma: string;
    idioma = localStorage.getItem("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }
    
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

    this.db.getPaginaWebEtiquetas ('boleto_turistico_' + idioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.db.getPaginaWebEtiquetas ('boleto_turistico').subscribe ((res) => {
      this.imagenes = res;
      console.log ("res", res);
    });

    this.utils.idioma.subscribe((nextValue: string) => {
      console.log ("Next Idioma", nextValue);
      /* subscribirme */
      this.db.getPaginaWebEtiquetas ('boleto_turistico_' + nextValue).subscribe ((res) => {
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
      doc: 'boleto_turistico',
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

}

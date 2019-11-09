import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import { DialogTextComponent } from '../../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../../dialogs/dialog-image/dialog-image.component';
import { MatDialog, MatDialogConfig } from "@angular/material"

@Component({
  selector: 'app-turismosocial',
  templateUrl: './turismosocial.component.html',
  styleUrls: ['./turismosocial.component.css']
})
export class TurismosocialComponent implements OnInit {
  Viajes:any;
  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    let idioma: string;
    idioma = localStorage.getItem("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    this.TodoslosViajesProgramados ();

    this.db.getPaginaWebEtiquetas ('turismo_social_' + idioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.db.getPaginaWebEtiquetas ('turismo_social').subscribe ((res) => {
      this.imagenes = res;
      console.log ("res", res);
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
      doc: 'turismo_social',
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

  TodoslosViajesProgramados () {
    this.db.getallViajesProgramados().subscribe(res=>{
      this.Viajes=res;
    });
  }
  goViajeProgramado (id:string) {
    this.route.navigate (["/viaje-programado/" + id]);
  }
}

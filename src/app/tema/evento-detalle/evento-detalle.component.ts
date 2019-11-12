import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DialogTextComponent } from '../../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../../dialogs/dialog-image/dialog-image.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-evento-detalle',
  templateUrl: './evento-detalle.component.html',
  styleUrls: ['./evento-detalle.component.css']
})
export class EventoDetalleComponent implements OnInit {
detalle:any;
Eventos:any[];
Fecha_del_evento:any='vacio';
etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    /* Capturamos el id */
    this.activatedRoute.params.subscribe( params =>{
      this.db.getEventosByKey(params['id']).subscribe( data => 
        {
          this.detalle=data;
          this.Fecha_del_evento=this.detalle.fecha;
          console.log('Este es el detalle:',this.detalle);
          if(this.Fecha_del_evento!='vacio')
          {
            this.TraerEventos();
          }
        });
    } )

    let idioma: string;
    idioma = localStorage.getItem("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    this.db.getPaginaWebEtiquetas ('evento_detalle_' + idioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.db.getPaginaWebEtiquetas ('evento_detalle').subscribe ((res) => {
      this.imagenes = res;
      console.log ("res", res);
    });

    this.utils.idioma.subscribe((nextValue: string) => {
      console.log ("Next Idioma", nextValue);
      /* subscribirme */
      this.db.getPaginaWebEtiquetas ('evento_detalle_' + nextValue).subscribe ((res) => {
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
      doc: 'evento_detalle',
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
  
  ObtenerDia(fecha:string)
  {
    return moment(fecha).format('DD');
  }

  ObtenerMesEnLetra(fecha:string)
  {
    return moment(fecha).format('MMM');
  }

  goCalendario () {
    this.route.navigate (["/calendario"]);
  }

  verDetalleEvento(id:string)
  {
    window.scrollTo(0, 0);
    this.route.navigate (["/evento-detalle/" + id]);
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  TraerEventos() 
  {
  console.log('Esta es la fecha del evento',this.Fecha_del_evento );
    
    this.db.getEventospormes(moment(this.Fecha_del_evento).format('MM')).subscribe((data: any [])=>{
    
      /*let respuesta=data.filter ((i: any) => {
        return new Date(i.datageneral.fecha).getTime() >= new Date().getTime();
      });*/
 
      this.Eventos = data.sort ((a: any, b: any) => {
        return +new Date(a.datageneral.fecha) - +new Date(b.datageneral.fecha);
      });

      let i=0;
      
      this.Eventos.forEach(evento => {
        //Asignar el color azul y rojo a cada evento
        if(i<1)
        {
          evento.color='azul';
          i++;
        }
        else
        {
          evento.color='rojo'; 
          if(i==1)
          {
            i=0;
          }
        }
        
      });
      
      console.log('listado de eventos del mes actual:', this.Eventos);
    })

  }

}

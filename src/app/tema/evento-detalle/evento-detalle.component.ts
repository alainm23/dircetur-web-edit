import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-evento-detalle',
  templateUrl: './evento-detalle.component.html',
  styleUrls: ['./evento-detalle.component.css']
})
export class EventoDetalleComponent implements OnInit {
detalle:any;
Eventos:any[];
Fecha_del_evento:any='vacio';
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute
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

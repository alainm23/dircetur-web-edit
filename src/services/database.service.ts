import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { first, map } from 'rxjs/operators';
import { combineLatest, of } from "rxjs/index";
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(private afs: AngularFirestore) { }

  getallblogs () {
    return this.afs.collection ('Blogs', res => res.orderBy('fecha_creado','desc')).valueChanges ();
  }

  getallcatfaqs () {
    return this.afs.collection ('FAQ_Categorias').valueChanges ();
  }

  getFaqsporCats (id: string) {
    const collection = this.afs.collection ("FAQ_Categorias").doc (id).collection ('FAQs');
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getEventosByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getallViajesProgramados () {
    return this.afs.collection ('Viajes_Programados').valueChanges ();
  }
  
  getallTurismoRural () {
    return this.afs.collection ('Turismo_Rural').valueChanges ();
  }

  getTurismoRuralByKey (id: string) {
    return this.afs.collection ("Turismo_Rural").doc (id).valueChanges ();
  }

  getViajeProgramadoByKey (id: string) {
    return this.afs.collection ("Viajes_Programados").doc (id).valueChanges ();
  }

  getViajeProgramadoPreguntas (id: string) {
    const collection = this.afs.collection ("Viajes_Programados").doc (id).collection ('Preguntas');
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getEventosByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }
  
  get7RutasSugeridas () {
    return this.afs.collection ('Circuitos_Turisticos', res => res.limit(7)).valueChanges ();
  }
  
  getallCircuitosTuristicos () {
    return this.afs.collection ('Circuitos_Turisticos').valueChanges ();
  }

  getallDirceturFunciones () {
    return this.afs.collection ('Dircetur_Funciones').valueChanges ();
  }

  getallDirceturJuntaDirectiva () {
    return this.afs.collection ('Dircetur_JuntaDirectiva').valueChanges ();
  }

  getTiposEventos () {
    return this.afs.collection ('Eventos_Tipos').valueChanges ();
  }
  get7rutasugeridashome () {
    return this.afs.collection ('Rutas', res => res.orderBy('fecha_creado','desc').limit(7)).valueChanges ();
  }
  getBlogByKey (id: string) {
    return this.afs.collection ("Blogs").doc (id).valueChanges ();
  }

  getCircuitoTourByKey (id: string) {
    return this.afs.collection ("Circuitos_Turisticos").doc (id).valueChanges ();
  }
  
  getCircuitoTourDias (id: string) {
    const collection = this.afs.collection ("Circuitos_Turisticos").doc (id).collection ('Dias');
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getEventosByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getEventosByKey (id: string) {
    return this.afs.collection ("Eventos").doc (id).valueChanges ();
  }
  
  getEventospormes (mes: string) {
    const collection = this.afs.collection ("Eventos_Fechas").doc (mes).collection ('Eventos');
                                                                                                                                                                                                                                    
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getEventosByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getallCats (){
    return this.afs.collection ('Blog_Categorias', res => res.orderBy('date_added','desc').limit(5)).valueChanges ();
  }
  
  getBlogporCat (id: string) {
    const collection = this.afs.collection ("Blog_Categorias").doc (id).collection ('Blogs');
                                                                                                                                                                                                                                    
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getBlogByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }



  // Pagina web
  updatePaginaWebValor (doc: string, etiqueta_key: string, etiqueta_valor: string) {
    let data: any = {};
    data [etiqueta_key] = etiqueta_valor;
    
    return this.afs.collection ('PaginaWeb').doc (doc).update (data);
  }

  getPaginaWebEtiquetas (doc: string) {
    return this.afs.collection ('PaginaWeb').doc (doc).valueChanges ();
  }

  createId () {
    return this.afs.createId ();
  }

  updateImage (etiqueta_key: string, data: any) {
    let request: any = {};
    request [etiqueta_key] = data;

    console.log ('request', request);

    return  this.afs.collection ('PaginaWeb').doc ('home').update (request);
  }
}

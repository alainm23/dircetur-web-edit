import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContenidoComponent } from './tema/contenido/contenido.component';
import {BoletoturisticoComponent} from './tema/boletoturistico/boletoturistico.component';
import {CircuitosturisticosComponent} from './tema/circuitosturisticos/circuitosturisticos.component';
import {TransparenciainstitucionalComponent} from './tema/transparenciainstitucional/transparenciainstitucional.component';
import {TurismoruralcomunitarioComponent} from './tema/turismoruralcomunitario/turismoruralcomunitario.component';
import {TurismosocialComponent} from './tema/turismosocial/turismosocial.component';
import { BlogDetalleComponent } from './tema/blog-detalle/blog-detalle.component';
import { TurismoComponent } from './tema/turismo/turismo.component';
import { ComercioexteriorComponent } from './tema/comercioexterior/comercioexterior.component';
import { ArtesaniaComponent } from './tema/artesania/artesania.component';
import { BlogsComponent } from './tema/blogs/blogs.component';
/*
import { EventosComponent } from './tema/eventos/eventos.component';
import { ProyectosEspecialesComponent } from './tema/proyectos-especiales/proyectos-especiales.component';
*/
import { ContactoComponent } from './tema/contacto/contacto.component';
import { EventoDetalleComponent } from './tema/evento-detalle/evento-detalle.component';
import { CircuitoDetalleComponent } from './tema/circuito-detalle/circuito-detalle.component';
import { CalendarioComponent } from './tema/calendario/calendario.component';
import { GuiaCartillaComponent } from './tema/guia-cartilla/guia-cartilla.component';
import { AlojamientoCartillaComponent } from './tema/alojamiento-cartilla/alojamiento-cartilla.component';
import { RestauranteCartillaComponent } from './tema/restaurante-cartilla/restaurante-cartilla.component';
import { AgenciaCartillaComponent } from './tema/agencia-cartilla/agencia-cartilla.component';
import { ViajeProgramadoComponent } from './tema/viaje-programado/viaje-programado.component';
import { ViajeRuralComponent } from './tema/viaje-rural/viaje-rural.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'sobre-nosotros', component: ContenidoComponent},
  { path: 'transparencia-institucional', component: TransparenciainstitucionalComponent},
  { path: 'circuitos-turisticos', component: CircuitosturisticosComponent},
  { path: 'boleto-turistico', component: BoletoturisticoComponent},
  { path: 'turismo-rural-comunitario', component: TurismoruralcomunitarioComponent},
  { path: 'turismo-social', component: TurismosocialComponent},
  { path: 'blog-detalle/:id', component: BlogDetalleComponent},
  { path: 'evento-detalle/:id', component: EventoDetalleComponent},
  { path: 'circuito-detalle/:id', component: CircuitoDetalleComponent},
  { path: 'turismo', component: TurismoComponent },
  { path: 'comercio-exterior', component: ComercioexteriorComponent},
  { path: 'artesania', component: ArtesaniaComponent},
  { path: 'blogs/:id', component: BlogsComponent},
  { path: 'viaje-programado/:id', component: ViajeProgramadoComponent},
  { path: 'viaje-rural/:id', component: ViajeRuralComponent},
 /* { path: 'eventos', component: EventosComponent},
  { path: 'proyectos-especiales', component: ProyectosEspecialesComponent},*/
  { path: 'contacto', component: ContactoComponent},
  { path: 'calendario', component: CalendarioComponent},
  { path: 'agencia-cartilla', component: AgenciaCartillaComponent},
  { path: 'alojamiento-cartilla', component: AlojamientoCartillaComponent},
  { path: 'restaurante-cartilla', component: RestauranteCartillaComponent},
  { path: 'guia-cartilla', component: GuiaCartillaComponent},
  { path: '**', component: HomeComponent},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

  
 }

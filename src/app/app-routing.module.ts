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
import { NoLoginComponent } from './no-login/no-login.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'no-login', component: NoLoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'sobre-nosotros', component: ContenidoComponent, canActivate: [AuthGuard]},
  { path: 'transparencia-institucional', component: TransparenciainstitucionalComponent, canActivate: [AuthGuard]},
  { path: 'circuitos-turisticos', component: CircuitosturisticosComponent, canActivate: [AuthGuard]},
  { path: 'boleto-turistico', component: BoletoturisticoComponent, canActivate: [AuthGuard]},
  { path: 'turismo-rural-comunitario', component: TurismoruralcomunitarioComponent, canActivate: [AuthGuard]},
  { path: 'turismo-social', component: TurismosocialComponent, canActivate: [AuthGuard]},
  { path: 'blog-detalle/:id', component: BlogDetalleComponent, canActivate: [AuthGuard]},
  { path: 'evento-detalle/:id', component: EventoDetalleComponent, canActivate: [AuthGuard]},
  { path: 'circuito-detalle/:id', component: CircuitoDetalleComponent, canActivate: [AuthGuard]},
  { path: 'turismo', component: TurismoComponent, canActivate: [AuthGuard]},
  { path: 'comercio-exterior', component: ComercioexteriorComponent, canActivate: [AuthGuard]},
  { path: 'artesania', component: ArtesaniaComponent, canActivate: [AuthGuard]},
  { path: 'blogs/:id', component: BlogsComponent, canActivate: [AuthGuard]},
  { path: 'viaje-programado/:id', component: ViajeProgramadoComponent, canActivate: [AuthGuard]},
  { path: 'viaje-rural/:id', component: ViajeRuralComponent, canActivate: [AuthGuard]},
 /* { path: 'eventos', component: EventosComponent},
  { path: 'proyectos-especiales', component: ProyectosEspecialesComponent},*/
  { path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard]},
  { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard]},
  { path: 'agencia-cartilla', component: AgenciaCartillaComponent, canActivate: [AuthGuard]},
  { path: 'alojamiento-cartilla', component: AlojamientoCartillaComponent, canActivate: [AuthGuard]},
  { path: 'restaurante-cartilla', component: RestauranteCartillaComponent, canActivate: [AuthGuard]},
  { path: 'guia-cartilla', component: GuiaCartillaComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ],
})

export class AppRoutingModule {

  
 }

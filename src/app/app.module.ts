import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './tema/header/header.component';
import { FooterComponent } from './tema/footer/footer.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlickityModule } from 'ngx-flickity';
import { AgenciaCartillaModule } from './tema/agencia-cartilla/agencia-cartilla.module';
import { AlojamientoCartillaModule } from './tema/alojamiento-cartilla/alojamiento-cartilla.module';
import { RestauranteCartillaModule } from './tema/restaurante-cartilla/restaurante-cartilla.module';
import { GuiaCartillaModule } from './tema/guia-cartilla/guia-cartilla.module';
import { ContenidoModule } from './tema/contenido/contenido.module';
import { TransparenciainstitucionalModule } from './tema/transparenciainstitucional/transparenciainstitucional.module';
import { TurismosocialModule } from './tema/turismosocial/turismosocial.module';
import { TurismoModule } from './tema/turismo/turismo.module';
import { TurismoruralcomunitarioModule } from './tema/turismoruralcomunitario/turismoruralcomunitario.module';
import { ProyectosEspecialesModule } from './tema/proyectos-especiales/proyectos-especiales.module';
import { EventosModule } from './tema/eventos/eventos.module';
import { EventoDetalleModule } from './tema/evento-detalle/evento-detalle.module';
import { ContactoModule } from './tema/contacto/contacto.module';
import { ComercioexteriorModule } from './tema/comercioexterior/comercioexterior.module';
import { CircuitosturisticosModule } from './tema/circuitosturisticos/circuitosturisticos.module';
import { CircuitoDetalleModule } from './tema/circuito-detalle/circuito-detalle.module';
import { CalendarioModule } from './tema/calendario/calendario.module';
import { BoletoturisticoModule } from './tema/boletoturistico/boletoturistico.module';
import { BlogsModule } from './tema/blogs/blogs.module';
import { BlogDetalleModule } from './tema/blog-detalle/blog-detalle.module';
import { ArtesaniaModule } from './tema/artesania/artesania.module';
import { ViajeProgramadoModule } from './tema/viaje-programado/viaje-programado.module';
import { ViajeRuralModule } from './tema/viaje-rural/viaje-rural.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatInputModule, MatProgressBarModule } from "@angular/material";

import { DialogTextComponent } from './dialogs/dialog-text/dialog-text.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './services/auth.guard';

// Editor
import { HttpClientModule} from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DialogImageComponent } from './dialogs/dialog-image/dialog-image.component';
import { NoLoginComponent } from './no-login/no-login.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DialogTextComponent,
    DialogImageComponent,
    NoLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule,
    FlickityModule,
    AgenciaCartillaModule,
    AlojamientoCartillaModule,
    RestauranteCartillaModule,
    GuiaCartillaModule,
    ContenidoModule,
    TransparenciainstitucionalModule,
    TurismosocialModule,
    TurismoModule,
    TurismoruralcomunitarioModule,
    ProyectosEspecialesModule,
    EventosModule,
    EventoDetalleModule,
    ContenidoModule,
    ContactoModule,
    ComercioexteriorModule,
    CircuitosturisticosModule,
    CircuitoDetalleModule,
    ViajeProgramadoModule,
    ViajeRuralModule,
    CalendarioModule,
    BoletoturisticoModule,
    BlogsModule,
    BlogDetalleModule,
    ArtesaniaModule,
    BrowserAnimationsModule,

    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    AngularFireStorageModule,
    MatProgressBarModule
  ],
  providers: [AuthGuard, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [DialogTextComponent, DialogImageComponent]
})
export class AppModule { }

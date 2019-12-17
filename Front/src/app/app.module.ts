import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
//COMPONENT
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeadersComponent } from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { ReservesComponent } from './reserves/reserves.component';

//SERVICES
import { LoginService } from './services/login.service';
import { StorageService } from './services/storage.service';
import { AuthorizatedGuard } from './services/authorizated.guard';
import { EventoService } from './services/evento.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    HeadersComponent,
    ReservesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    NgbPaginationModule,
    NgbAlertModule,
    HttpModule
  ],
  providers: [
    LoginService,
    StorageService,
    AuthorizatedGuard,
    EventoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

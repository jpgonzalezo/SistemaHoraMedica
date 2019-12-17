import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
//COMPONENT
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';


//SERVICES
import { LoginService } from './services/login.service';
import { StorageService } from './services/storage.service';
import { AuthorizatedGuard } from './services/authorizated.guard';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    LoginService,
    StorageService,
    AuthorizatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

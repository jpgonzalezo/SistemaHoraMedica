import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeadersComponent implements OnInit {

  //dentro del constructor se declaran los servicios que se van a utilizar
  constructor(private _loginService: LoginService,
              private _storageService: StorageService)
  {}

  ngOnInit() {
  }
  public logout(): void{
    this._storageService.logout();
  }
}
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {StorageService} from "src/app/services/storage.service";
@Injectable()
export class AuthorizatedGuard implements CanActivate {
  constructor(private router: Router,
              private storageService: StorageService) { }
  canActivate() {
    if (this.storageService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
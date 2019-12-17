import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {Session} from "../models/session.model";
@Injectable()
export class StorageService {
  private localStorageService;
  private sesionActual : Session = null;
  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.sesionActual = this.loadSessionData();
  }
  setCurrentSession(session: Session): void {
    this.sesionActual = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }
  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }
  getCurrentSession(): Session {
    return this.sesionActual;
  }
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.sesionActual = null;
  }
  getCurrentUser(){
    var session: Session = this.getCurrentSession();
    return (session ) ? session : null;
  };

  isAuthenticated(): boolean{
    if (this.sesionActual != null) {
      return true
    }
    else{
      return false
    }
  }

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
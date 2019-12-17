import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import swal from'sweetalert2';
import * as $ from 'jquery';
import { UserService } from 'src/app/services/user.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    constructor(
        public location: Location, 
        private router: Router,
        private _userService: UserService
        ) {
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
    }

    createUser(){
        swal.fire({
            type:'question',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            confirmButtonColor: '#2dce89',
            cancelButtonColor: '#fb6340',
            title: 'Registro de usuario',
            preConfirm: function () {
              return {
                  'email':$('#swal-input2').val(),
                  'fullname':$('#swal-input1').val(),
              }
            },
            onOpen: function (){
                swal.disableConfirmButton();
                swal.getContent().addEventListener('keyup',function(e){
                  if( ($('#swal-input1').val() === '' || $('#swal-input2').val() === '' || $('#swal-input2').val().indexOf("@")==-1 )  ) {
                    swal.disableConfirmButton();
                  } 
                  else {
                    swal.enableConfirmButton();
                  }
                })
              },
            html:
              '<label>Nombre Usuario</label>'+
              '<input type="text" id="swal-input1" class="swal2-input" placeholders="email@correo.cl">'+
              '<label>Email</label>'+
              '<input type="email" id="swal-input2" class="swal2-input" placeholders="Nombre usuario">'
        }).then((result)=>{
            if(result.dismiss==null){
                this._userService.postUser(result.value).subscribe((data)=>{
                    if(data["message"]=="User created successfully"){
                        swal.fire({
                            type:"success",
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#2dce89',
                            text:"Se ha creado al usaurio exitosamente!",
                            title:"Registro exitoso"
                        })
                    }
                    if(data["message"]=="Fullname registered"){
                        swal.fire({
                            type:"error",
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#2dce89',
                            text:"El nombre de usuario ya se encuentra registrado",
                            title:"Error en el registro"
                        }).then((result)=>{this.createUser()})
                    }
                    if(data["message"]=="Email registered"){
                        swal.fire({
                            type:"error",
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#2dce89',
                            text:"El email ya se encuentra registrado",
                            title:"Error en el registro"
                        }).then((result)=>{this.createUser()})
                    }
                })
            }
        })
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
}

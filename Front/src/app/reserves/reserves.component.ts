import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import swal from'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import * as $ from 'jquery';

const HOURS = {
  "09:00:00":"09:00 am",
  "10:00:00":"10:00 am",
  "11:00:00":"11:00 am",
  "12:00:00":"12:00 pm",
  "13:00:00":"13:00 pm",
  "14:00:00":"14:00 pm",
  "15:00:00":"15:00 pm",
  "16:00:00":"16:00 pm",
  "17:00:00":"17:00 pm",
  "18:00:00":"18:00 pm",
  "19:00:00":"19:00 pm",
  "20:00:00":"20:00 pm",
  "21:00:00":"21:00 pm",
}
@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html'
})
export class ReservesComponent implements OnInit {
  token: string
  eventos: any[];
  eventos_user: any[];
  pageEvento: number;
  pageSizeEvento: number;
  collectionSizeEvento: number;
  load=false
  constructor(
    public _eventoService: EventoService,
    private _storageService: StorageService,
  ) {
    this.eventos = [];
    this.eventos_user = [];
    this.pageEvento = 1;
    this.pageSizeEvento = 10;
  }

  ngOnInit() {
    this.getEventos();
    this.getEventosUser();
  }

  getEventos(){
    this._eventoService.getEventos().subscribe((data:any[])=>{
      this.eventos = data['reserves']
      this.collectionSizeEvento = this.eventos.length
    })
  }

  getEventosUser(){
    this.load = true
    this._eventoService.getEventosUser(this._storageService.getCurrentUser()['id']).subscribe((data:any[])=>{
      this.eventos_user = data
      this.collectionSizeEvento = this.eventos_user.length
      this.load=false
    })
  }


  editReserva(event){
    swal.fire({
      title:'Edicion evento',
      text: 'Seleccione que edición desea realizar para el evento',
      input: 'select',
      inputOptions: {
        "editHour": "Editar hora",
        "editDate": "Editar fecha",
        "editTitle": "Editar título"
      },
      inputPlaceholder: 'Seleccione una opción',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value === "") {
            resolve('Debes seleccionar una opción')
          } else {
            resolve()
          }
        })
      }
    }).then((result)=>{
      if(result.dismiss==null){
        if(result.value=="editDate"){
          this.editDateReserva(event);
        }
        if(result.value=="editHour"){
          this.editHourReserva(event);
        }
        if(result.value=="editTitle"){
          this.editTitleReserva(event);
        }
      }
    })
  }

  editTitleReserva(event_){
    swal.fire({
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      title: 'Título de reserva',
      text: 'Ingrese el nuevo título para la reserva',
      input: 'text',
      inputPlaceholder: event_.title,
      onOpen: function (){
        swal.disableConfirmButton();
        swal.getInput().addEventListener('keyup', function(e) {
          if((<HTMLInputElement>event.target).value == "" || parseInt((<HTMLInputElement>event.target).value)<=0) {
            swal.disableConfirmButton();
          } 
          else {
            swal.enableConfirmButton();
          }
          })
      }
    }).then((result)=>{
      if(result.dismiss==null){
        this._eventoService.putEvento({start:event_.start,title:result.value,hour:event_.hour},event_.id).subscribe((data)=>{
          if(data['message']!=null){
            swal.fire({
              type:'success',
              title:'Registro exitoso',
              text:'Se ha modificado el título de su reserva exitosamente',
              confirmButtonColor: '#5cb85c',
              confirmButtonText: 'Aceptar',
            }).then((result)=>{
              this.getEventos();
              this.getEventosUser();
            })
          }
        })
      }
    });
  }

  editHourReserva(event){
    var horas_dict = HOURS
    for(let event_register of this.eventos){
      if (event_register['start'] == event['start']){
        delete horas_dict[event_register['hour']]
      }
    }
    swal.fire({
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      title: 'Hora de reserva',
      text: 'Seleccione la nueva hora a la que desea reservar',
      input: 'select',
      inputOptions: horas_dict,
      inputPlaceholder: 'Seleccione un hora',
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value === "") {
            resolve('Debes seleccionar una hora')
          } else {
            resolve()
          }
        })
      }
    }).then((result)=>{
      if(result.dismiss==null){
        this._eventoService.putEvento({start:event.start,title:event.title,hour:result.value},event.id).subscribe((data)=>{
          if(data['message']!=null){
            swal.fire({
              type:'success',
              title:'Registro exitoso',
              text:'Se ha modificado la fecha de su reserva exitosamente',
              confirmButtonColor: '#5cb85c',
              confirmButtonText: 'Aceptar',
            }).then((result)=>{
              this.getEventos();
              this.getEventosUser();
            })
          }
        })
      }
    });
  }

  editDateReserva(event){
    swal.fire({
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      title: 'Fecha de reserva',
      preConfirm: function () {
        return {
          'start': $('#swal-input').val(),
        }
      },
      onOpen: function (){
        swal.disableConfirmButton();
        swal.getContent().addEventListener('keyup',function(e){
          if($('#swal-input').val() === '') {
            swal.disableConfirmButton();
          } 
          else {
            swal.enableConfirmButton();
          }
        })
      },
      html: '<label>Ingrese la nueva fecha de la reserva</label>'+'<br>'+'<input id="swal-input" type="date">',
    }).then((result)=>{
      if(result.dismiss==null){
        var bandera = true;
        for(let event_register of this.eventos){
          if(result.value['start']==event_register['start'] && event_register['id']!=event['id']){
            if(event_register['hour'] == event['hour']){
              bandera=false;
            }
          }
        }
        if(bandera){
          this._eventoService.putEvento({start:result.value['start'],title:event.title,hour:event.hour},event.id).subscribe((data)=>{
            if(data['message']!=null){
              swal.fire({
                type:'success',
                title:'Registro exitoso',
                text:'Se ha modificado la fecha de su reserva exitosamente',
                confirmButtonColor: '#5cb85c',
                confirmButtonText: 'Aceptar',
              }).then((result)=>{
                this.getEventos();
                this.getEventosUser();

              })
            }
          })
        }
        else{
          swal.fire({
            type:'error',
            title:'Fecha no válida',
            text:'No se puede cambiar la fecha debido a que ya existe una reserva en esa hora',
            confirmButtonColor: '#5cb85c',
            confirmButtonText: 'Aceptar',
          }).then((result)=>{this.editDateReserva(event)})
        }
      }
    });
  }

  get eventos_tabla(): any[] {
    return this.eventos_user
      .map((evento, i) => ({id: i + 1, ...evento}))
      .slice((this.pageEvento - 1) * this.pageSizeEvento, (this.pageEvento - 1) * this.pageSizeEvento + this.pageSizeEvento);
  }

  deleteEvento(id:string){
    swal.fire({
      title: 'Eliminar Reserva',
      text: "Desea eliminar esta reserva?. Estos cambios son irreversibles!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.dismiss == null) {
        this._eventoService.deleteEvento(id).subscribe((data:any)=>{
          if(data['message']!=null){
            swal.fire({
              type: 'success',
              title: 'Borrado exitoso',
              text: 'Se ha eliminado la reserva correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5cb85c',
            }).then((result2)=>{
                this.getEventos();
                this.getEventosUser();
            })
          }
        })
      }
    })
  }


}
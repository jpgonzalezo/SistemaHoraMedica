import { Component, OnInit, ViewChild} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import swal from'sweetalert2';
import { EventoService } from 'src/app/services/evento.service';
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
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    @ViewChild('calendar') calendarComponent: FullCalendarComponent// the #calendar in the template
    bootstrapPlugin = bootstrapPlugin
    esLocale = esLocale
    calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, bootstrapPlugin];
    calendarWeekends = true;
    calendarEvents = [];
    load = false;
    constructor(
        private _eventoService:EventoService,
        private _storageService:StorageService
    ) { }

    ngOnInit() {
        this.getEventos();
    }

    getEventos(){
        this.load = true;
        const user = this._storageService.getCurrentUser()
        this._eventoService.getEventos().subscribe((data: any[])=>{
          if(data['reserves']!=null){
            var date = []
            for(let event of data['reserves']){
              date.push({
                title: event['title'],
                textColor: '#ffffff',
                date: event['start']+" "+event['hour'],
                date_reserve: event['start'],
                id: event['id'],
                hour: event['hour']
              })
            }
            this.calendarEvents = date;
          }
          this.load = false;
        })
    }

    nuevoEvento(arg) {
        var horas_dict = HOURS
        for(let event of this.calendarEvents){
          if ((event['date_reserve']) == (arg.dateStr)){
            delete horas_dict[event['hour']]
          }
        }
        swal.fire({
          type: 'question',
          title: 'Nueva Cita',
          text: 'Desea agendar una hora a la fecha '+arg.dateStr+' ?',
          showCancelButton: true,
          confirmButtonColor: '#2dce89',
          cancelButtonColor: '#fb6340',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((result)=>{
          if(result.dismiss==null){
            swal.mixin({
              confirmButtonColor: '#2dce89',
              cancelButtonColor: '#fb6340',
              confirmButtonText: 'Siguiente',
              cancelButtonText: 'Cancelar',
              showCancelButton: true,
              progressSteps: ['1', '2']
            }).queue([
              {
                type:'question',
                title: 'Título de la reserva',
                text: 'Ingrese un título descriptivo para la reserva',
                input: 'text',
                confirmButtonColor: '#2dce89',
                cancelButtonColor: '#fb6340',
                confirmButtonText: 'Siguiente',
                cancelButtonText: 'Cancelar',
                showCancelButton: true,
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
              },
              {
                type:'question',
                title: 'Hora para la reserva',
                text: 'Seleccione la hora de la reserva',
                input: 'select',
                inputOptions: horas_dict,
                inputPlaceholder: 'Seleccione un hora',
                showCancelButton: true,
                inputValidator: function (value) {
                  return new Promise(function (resolve, reject) {
                    if (value === "") {
                      resolve('Debes seleccionar una hora')
                    } else {
                      resolve()
                    }
                  })
                }
              }
            ]).then((result) => {
              if (result.dismiss==null) {
                this._eventoService.postEvento({"start":arg.dateStr,"title":result.value[0],"hour": result.value[1],"userid":this._storageService.getCurrentUser()['id']}).subscribe((data:any)=>{
                  if(data['message']=="New reserve created"){
                    swal.fire({
                      type:'success',
                      title:'Registro Exitoso',
                      text:'Se ha realizado la reserva exitosamente',
                      confirmButtonColor: '#2dce89',
                      confirmButtonText: 'Aceptar'
                    }).then((result)=>{
                      this.getEventos()
                    })
                  }
                })
              }
            })
          }
        })
      }
}

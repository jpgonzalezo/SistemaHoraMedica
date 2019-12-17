import { Component, OnInit, ViewChild} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import swal from'sweetalert2';
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
    load = false
    constructor() { }

    ngOnInit() {}

    getEventos(){
        this.load = false
        this.calendarEvents = []
        this.load = false
    }

    nuevoEvento(arg) {
        var horas_dict = {
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
            swal.fire({
              type: 'question',
              title: 'Hora solicitud',
              text: 'Seleccione la hora que desea realizar la solicitud',
              confirmButtonColor: '#2dce89',
              cancelButtonColor: '#fb6340',
              confirmButtonText: 'Siguiente',
              cancelButtonText: 'Cancelar',
              showCancelButton: true,
              input:'select',
              inputOptions: horas_dict
            }).then((result) => {
              if (result.dismiss==null) {
                if(result.value == ""){
                    console.log("jj")
                }
                else{
                    console.log(result.value)
/*                   this._eventoService.postEvento({"fecha":arg.dateStr,"title":result.value[0],"backgroundColor": result.value[1],"curso":result.value[2]},this.token).subscribe((data:any)=>{
                    if(data['Response']=="exito"){
                      swal.fire({
                        type:'success',
                        title:'Registro Exitoso',
                        text:'Se ha creado el evento exitosamente',
                        confirmButtonColor: '#2dce89',
                        confirmButtonText: 'Siguiente'
                      }).then((result)=>{
                        this.getEventos()
                      })
                    }
                  }) */
                }
              }
            })
          }
        })
      }
}

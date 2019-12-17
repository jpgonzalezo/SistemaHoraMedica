import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import swal from'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html'
})
export class ReservesComponent implements OnInit {
  token: string
  eventos: any[];
  pageEvento: number;
  pageSizeEvento: number;
  collectionSizeEvento: number;
  load=false
  constructor(
    public _eventoService: EventoService,
    private _storageService: StorageService,
  ) {
    this.eventos = []
    this.pageEvento = 1
    this.pageSizeEvento = 10
  }

  ngOnInit() {
    this.getEventos()
  }

  getEventos(){
    this.load = true
    this._eventoService.getEventos().subscribe((data:any[])=>{
      this.eventos = data['reserves']
      this.collectionSizeEvento = this.eventos.length
      this.load=false
    })
  }

  get eventos_tabla(): any[] {
    return this.eventos
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
                this.getEventos()
            })
          }
        })
      }
    })
  }


}
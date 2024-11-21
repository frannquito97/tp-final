import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  msjError ( e : HttpErrorResponse){
    if (e.error.msg) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: `${e.error.msg}.`,
        confirmButtonColor: 'red',
        confirmButtonText: 'Regresar',
        allowOutsideClick: false,
        animation: true
      })
        
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          html: `${e.error.msg}.`,
          confirmButtonColor: 'red',
          allowOutsideClick: false
        })
      }
    }
}

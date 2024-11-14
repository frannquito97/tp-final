import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AddTokenInterceptor implements HttpInterceptor {
  constructor(private router : Router, private _errorService : ErrorService){}
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");
    if(token){
      req = req.clone( { setHeaders: { Authorization: `Bearer ${token}`}})
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          this._errorService.msjError(error)
          this.router.navigate(['/f1Games'])
        }
        return throwError(() => new Error('Error'))
      })
    );
  }
}

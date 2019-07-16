import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../services/authentication.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, 
        private toastrService: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request).pipe(catchError(err => {
            // this.toastrService.error(err.error.statusMessage, "Error Message");
            // const error = err.error.message || err.statusText;
            return throwError(err);
        }));
    }
}
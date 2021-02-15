import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { TokenService } from '../../shared/auth/token.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(private injector:Injector){}
  hanleError(error:HttpErrorResponse){
    console.log(error);
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(TokenService);
    // console.log(authService.get())
    const headers = new HttpHeaders({
      // 'Access-Control-Allow-Origin':'*',
      // 'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization : `Bearer ${authService.get()}`
    });

    const clone = req.clone({headers});

    return next.handle(clone).pipe(
      mergeMap((event: any) => {
        return of(event);
      }),
      catchError(this.hanleError)
    );
  }
}

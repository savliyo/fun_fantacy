import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private ls = inject(LocalStorageService);
  private router = inject(Router);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.ls.get('token');

    if (token) {
      request = this.addTokenheader(request, token);
    }

    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return event;
          } else {
            //get error else not get return statement
            return false;
          }
        },
        error: (err) => {
          // console.log(err, "this is error");
          if (err.status == 401) {
            this.ls.remove('token');
            this.router.navigate(['/auth']);
          }
        },
      })
    );
  }

  addTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
}

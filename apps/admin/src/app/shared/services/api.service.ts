import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { EMPTY, Observable, catchError } from 'rxjs';
import { MxNotification } from '../ui/notification/notification.service';
import { environment } from '../../../environments/environment';
import {
  MxListResponse,
  MxResponse,
} from '../../../../../../libs/mx-schema/src';

type QueryParams =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private notif = inject(MxNotification);

  constructor(private _http: HttpClient) {}

  private makeURL(endpoint: string) {
    return `${environment.api}/api/v1${endpoint}`;
  }

  get<T>(
    endpoint: string,
    queryParams?: QueryParams
  ): Observable<MxResponse<T>> {
    return this._http
      .get<MxResponse<T>>(this.makeURL(endpoint), {
        params: queryParams,
      })
      .pipe(catchError(this.handleError));
  }

  getList<T>(
    endpoint: string,
    queryParams?: QueryParams
  ): Observable<MxListResponse<T>> {
    return this._http
      .get<MxListResponse<T>>(this.makeURL(endpoint), {
        params: queryParams,
      })
      .pipe(catchError(this.handleError));
  }

  delete<T>(
    endpoint: string,
    queryParams?: QueryParams
  ): Observable<MxResponse<T>> {
    return this._http
      .delete<MxResponse<T>>(this.makeURL(endpoint), {
        params: queryParams,
      })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: unknown): Observable<MxResponse<T>> {
    return this._http
      .post<MxResponse<T>>(this.makeURL(endpoint), body)
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: unknown): Observable<MxResponse<T>> {
    return this._http
      .put<MxResponse<T>>(this.makeURL(endpoint), body)
      .pipe(catchError(this.handleError));
  }

  media(
    endpoint: string,
    body: Partial<{
      single: { field: string; value: any };
      array: { field: string; value: any[] };
    }>
  ): Observable<any> {
    const formData = new FormData();
    if (body.single?.field && body.single?.value) {
      formData.append(body.single.field, body.single.value);
    }

    if (body?.array?.field && body?.array?.value) {
      for (const iterator of body.array.value) {
        formData.append(body.array.field, iterator);
      }
    }

    return this._http.post<any>(this.makeURL(endpoint), formData);
  }

  private handleError = (error: HttpErrorResponse) => {
    this.notif.show({
      text:
        this.qualifyError(error.error) ||
        this.qualifyError(error.error?.msg) ||
        'Something went wrong !',
      type: 'error',
    });

    return EMPTY;
  };

  private qualifyError(err: any) {
    if (typeof err === 'string') {
      return err;
    }
    return false;
  }
}

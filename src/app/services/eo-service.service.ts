import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {baseURL} from "../globals";

@Injectable({
  providedIn: 'root',
})
export class EoServiceService {
  public apiUrl = baseURL

  constructor(private http: HttpClient) {
  }

  _handleHttpErrorResponse(error: HttpErrorResponse) {
    let errorMessage = '';
    console.log('error in post')

    if (error.status === 404) {
      errorMessage = 'Resource not found';
    } else if (error.status === 429) {
      errorMessage = 'Too many requests Try again later';
    } else if (error.status === 500) {
      errorMessage = 'Internal server error';
    } else {
      errorMessage = `An error occurred: ${error.message}`;
    }

    return throwError(
      () =>
        ({
          error,
          errorMessage,
        } as ICustomError)
    );
  }

  getStateNames(): Observable<Istate[]> {
    return this.http
      .get<Istate[]>(this.apiUrl + '/eo/states')
      .pipe(catchError(this._handleHttpErrorResponse));
  }

  getNDVI(formData: FormData, headers: HttpHeaders): Observable<IwmsResponse> {
    return this.http
      .post<IwmsResponse>(this.apiUrl + '/eo/ndvi', formData, {headers})
      .pipe(catchError(this._handleHttpErrorResponse));
  }

  getNDWI(formData: FormData, headers: HttpHeaders): Observable<IwmsResponse> {
    return this.http
      .post<IwmsResponse>(this.apiUrl + '/eo/ndwi', formData, {headers})
      .pipe(catchError(this._handleHttpErrorResponse));
  }

  getLandCover(formData: FormData, headers: HttpHeaders): Observable<IwmsResponse> {
    return this.http
      .post<IwmsResponse>(this.apiUrl + '/eo/land-cover', formData, {headers})
      .pipe(catchError(this._handleHttpErrorResponse));
  }

  getLST(formData: FormData, headers: HttpHeaders): Observable<IwmsResponse> {
    return this.http
      .post<IwmsResponse>(this.apiUrl + '/eo/lst', formData, {headers})
      .pipe(catchError(this._handleHttpErrorResponse));
  }


}

export interface IwmsResponse {
  status: string;
  url: string;
  histogram: Ihistogram;
  message?: string
}

export interface Ihistogram {
  means: number[];
  bins: number[];
  width: number
  labels?: string[]
}

export interface Istate {
  objectid: number;
  admin1name: string
}

export interface ICustomError {
  error: HttpErrorResponse;
  errorMessage: string;
}

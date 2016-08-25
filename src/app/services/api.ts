import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
  api_url: string = 'http://localhost:3500';
  constructor(
    private http: Http
  ){}
  private getJson(responce: Response) {
    return responce.json();
  }
  private checkForError(responce: Response): Response {
    if (responce.status >= 200 && responce.status < 300) {
      return responce;
    } else {
      var error = new Error(responce.statusText);
      console.error(error);
      throw error;
    }
  }
  get(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }
  post(path: string, body): Observable<any> {
    return this.http.post(
        `${this.api_url}${path}`,
        JSON.stringify(body),
        {headers: this.headers}
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }
  delete(path: string): Observable<any> {
    return this.http.post(
        `${this.api_url}${path}`,
        {headers: this.headers}
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }
}
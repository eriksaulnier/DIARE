import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

@Injectable()
export class JournalsService {
  constructor(private http: Http, private config: AppConfig) { }
  //------------------------------------------------------------------------------------------------------------------------------
  //Creates new journal
  //data object must contain id field with user's id and title field with journal's title
  //will return either an error or the id of the newly created journal in the format {id: journalID}

  create(data: any) {
    var result = this.http.post(this.config.apiURL + '/journals/create', data, this.jwt());
    return result;
  }
  //------------------------------------------------------------------------------------------------------------------------------
  //Creates request header with JWT token - needed so that you can hit protected api routes

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------
}

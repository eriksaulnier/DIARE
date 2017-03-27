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
  //will return either an error or the id of the newly created journal in the format {id: journalID}

  create(userid: string, title: string) {
    return this.http.post(this.config.apiURL + '/journals/create', {id: userid, title: title}, this.jwt())
      .map((response: Response) => {
        let data = response.json();
        return data;
      });
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

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

@Injectable()
export class JournalsService {
  constructor(private http: Http, private config: AppConfig) { }
  //------------------------------------------------------------------------------------------------------------------------------
  // Creates new journal
  // Will return either an error or {id: journalID, message: string talking about how adding journal was successful}

  create(userid: string, title: string) {
    return this.http.post(this.config.apiURL + '/journals/create', {id: userid, title: title}, this.jwt())
      .map((response: Response) => {
        let data = response.json();
        return data;
      });
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Gets all journals tied to a user id
  // Will load an array of journal objects into userJournals local storage item

  getAllJournals(userid: string) {
    return this.http.get(this.config.apiURL + '/journals/getAll/' + userid, this.jwt())
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          // store array of journal objects in local storage
          localStorage.setItem('userJournals', JSON.stringify(data));
        }
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

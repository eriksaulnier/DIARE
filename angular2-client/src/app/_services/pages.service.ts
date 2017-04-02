import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

@Injectable()
export class PagesService {
	private emitterSource: Subject<string> = new Subject();
	emitter = this.emitterSource.asObservable();

  constructor(
		private http: Http,
		private config: AppConfig
	) { }

  //------------------------------------------------------------------------------------------------------------------------------
  // Updates a page object
	// data should be an object where each field is a field you want to update in the page object, ex: data = {title: 'New Title'}
  // Will return either an error or {message: string talking about how updating page was successful}

  updatePage(pageID: string, data: any) {
    return this.http.put(this.config.apiURL + '/pages/' + pageID,  data, this.jwt())
      .map((response: Response) => {
        let data = response.json();
        return data;
      });
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Creates request header with JWT token - needed so that you can hit protected api routes

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

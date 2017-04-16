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
	// Creates new journal page
	// Will return either an error or the new page object

	create(journalID: string, pageTitle: string) {
		return this.http.post(this.config.apiURL + '/pages/create', {id: journalID, title: pageTitle}, this.jwt())
			.map((response: Response) => {
				let data = response.json();
				return data;
			});
	}
  //------------------------------------------------------------------------------------------------------------------------------
	// Deletes journal page with specified id
	// Will return either an error or {message: string talking about how deleting page was successful}

	delete(journalID: string, pageID: string) {
		return this.http.delete(this.config.apiURL + '/pages/delete/'+ journalID + "/" + pageID, this.jwt())
			.map((response: Response) => {
				return response;
			});
	}
	//------------------------------------------------------------------------------------------------------------------------------
  // Updates a page object
	// data should be an object where data = {title: 'New Title'}
  // Will return either an error or {message: string talking about how updating page was successful}

  update(journalID: string, pageID: string, data: any) {
		if (data.title) {
			return this.http.put(this.config.apiURL + '/pages/' + journalID + "/" + pageID,  data, this.jwt())
				.map((response: Response) => {
					let data = response.json();
					return data;
				});
		}
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

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

	// ---------------------------------------------------------------------------
	// Creates new journal page
	// Will return either an error or the new page object
	create(journalID: string, pageTitle: string) {
		return this.http.post(this.config.apiURL + '/pages/create', {id: journalID, title: pageTitle}, this.jwt())
			.map((response: Response) => {
				let data = response.json();
				return data;
			});
	}

  // ---------------------------------------------------------------------------
	// Deletes journal page with specified id
	// Will return either an error or {message: string talking about how deleting page was successful}
	delete(journalID: string, pageID: string) {
		return this.http.delete(this.config.apiURL + '/pages/delete/'+ journalID + "/" + pageID, this.jwt())
			.map((response: Response) => {
				return response;
			});
	}

	// ---------------------------------------------------------------------------
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

	// ---------------------------------------------------------------------------
	// Gets a page object
	// will return either an error message or a page object
	// if sortOrder is true, bullets will return sorted from most recently modified to least recently modified
	// if sortOrder is false, bullets will return sorted from least recently modified to most recently modified

	get(journalID: string, pageID: string, sortOrder: boolean) {
		return this.http.get(this.config.apiURL + '/pages/' + journalID + "/" + pageID + "/" + sortOrder, this.jwt())
		.map((response: Response) => {
				let data = response.json();
				if (data && data._id) {
					// Store page object in local storage
					localStorage.setItem('currentPage', JSON.stringify(data));

					// Emit message to update page
					this.emitterSource.next('updatePage');
				}
			});
	}

	// ---------------------------------------------------------------------------
	// Selects page with the given id
	selectPage(pageId: string = "") {
		let currentJournal = JSON.parse(localStorage.getItem('currentJournal'));

		// If id is empty and there are pages fill with first one
		if (pageId == "") {
			if (currentJournal.pages.length > 0) {
				pageId = currentJournal.pages[0]._id;
			} else {
				// Clear current page if there is no page to load
				localStorage.setItem('currentPage', null);
				this.emitterSource.next('updatePage');
				return;
			}
		}

		// Tell the service to get the page and store on local storage
		this.get(currentJournal._id, pageId, false)
			.subscribe(
				data => {
					console.log("Successfully set currentPage to " + pageId);
				},
				error => {
					console.log("Failed to get page: " + error._body);
				});
	}

	// ---------------------------------------------------------------------------
	// Updates page data if currentPage is set on local storage
	updatePage() {
		let currentJournal = JSON.parse(localStorage.getItem('currentJournal'));
		let currentPage = JSON.parse(localStorage.getItem('currentPage'));

		if (currentPage != null && currentPage._id != null) {
			this.get(currentJournal._id, currentPage._id, false)
				.subscribe(
					data => {
						console.log("Successfully updated currentPage data");
					},
					error => {
						console.log("Failed to update page data: " + error._body);
					}
				)
		}
	}
  // ---------------------------------------------------------------------------
  // Creates request header with JWT token - needed so that you can hit protected api routes
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

  // ---------------------------------------------------------------------------
}

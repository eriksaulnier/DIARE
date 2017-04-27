import { Component, OnInit } from '@angular/core';
import { BulletsService } from '../_services/index';
import { Bullet } from '../_models/index';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
	providers: [BulletsService]
})
export class SearchComponent implements OnInit {
	private userid: string;
	searchTerms: string;
	searchResults: Bullet[];

  constructor(
		private bulletsService: BulletsService
	) {
		// Fetch the current userid and store in local storage
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.userid = user._id;

		// Subscribe to the bulletService emitter so we can get global update messages
		this.bulletsService.emitter.subscribe(
			message => { this.bulletMessageRecieved(message) }
		)
	}

  ngOnInit() {
  }


	// ---------------------------------------------------------------------------
	// Searches bullets for the given keywords
	search(keywordInput: HTMLInputElement) {
		let keywords = keywordInput.value.replace(/\s+$/, '');
		if (keywords == '')
			return;

		// Use bullets service to search bullets for keywords
		let query = {"content": keywords};
		this.bulletsService.search(this.userid, query)
			.subscribe(
				data => {
					// Save search terms on local variable
					this.searchTerms = keywords;
					
					console.log("Successfully searched bullets for '" + keywords + "'");
				},
				error => {
					console.log(error);
				});
	}


	// ---------------------------------------------------------------------------
	// Returns true or false depending on if there are search results
	hasSearchResults() {
		return (this.searchResults != null && this.searchResults.length > 0);
	}


	// ---------------------------------------------------------------------------
	// Handles recieving and routing messages from the bulletsService
	private bulletMessageRecieved(message: string) {
		switch (message) {
			case 'updateSearchResults': {
				this.searchResults = JSON.parse(localStorage.getItem('searchResults'));
				break;
			}
		}
	}
}

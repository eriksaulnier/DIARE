import { Component, OnInit, Input } from '@angular/core';
import { PagesService, JournalsService, PopupService} from '../../../../_services/index';

import { Page, Journal} from '../../../../_models/index';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
	private userid: string;
	@Input() page: Page;
	@Input() journal: Journal;

  constructor(
		private pagesService: PagesService,
		private journalsService: JournalsService,
		private popupService: PopupService
	) {
		// Fetch the current userid and store in local storage
		let user = JSON.parse(localStorage.getItem('currentUser'));
		let currentJournal = JSON.parse(localStorage.getItem('currentJournal'));
		this.userid = user._id;
	}

  ngOnInit() {
  }

	selectPage(event) {
		this.pagesService.selectPage(this.page._id);
	}



	//----------------------------------------------------------------------------
   // Updates list of current journals on localstorage and tells views to update
    getAllJournals(userID: string = this.userid) {
      this.journalsService.getAllJournals(userID)
      .subscribe(
        data => {
					console.log("Successfully fetched journals for user " + userID);
        },
        error => {
          console.log("Getting journals failed:  " + error._body);
        });
    }
	// ---------------------------------------------------------------------------
	// Spawns a popup and upon confirmation deletes this page
	confirmDeletePage() {
		this.popupService.createDialog(
			"Confirm Delete",
			"Are you sure you want to delete <b>" + this.page.title + "</b>?",
			"Cancel",
			"Yes, delete the page",
			this.deletePage.bind(this)
		);
	}

	// ---------------------------------------------------------------------------
  // Deletes this page
	private deletePage() {
		// Delete this page through the pages service
		let currentJournal = JSON.parse(localStorage.getItem('currentJournal'));
				
    this.pagesService.delete(currentJournal._id, this.page._id)
      .subscribe(
        data => {
					console.log("Successfully deleted page " + this.page._id);

					// Update the page list
					this.getAllJournals();
        },
        error => {
					console.log("Deleting page failed:  " + error._body);
        });
  }

	//--------------------------------------------------------

  // Spawns a popup for editing this page title
  editPageTitle() {
    this.popupService.createForm(
      "Edit Page Title",
	  "",
      "New Title",
      "Cancel",
      "Submit",
      this.updatePageTitle.bind(this)
    );
  }

    // Update this pages's title
	private updatePageTitle(value: string) {
	let currentJournal = JSON.parse(localStorage.getItem('currentJournal'));
	  this.pagesService.update(currentJournal._id, this.page._id, {title: value})
     .subscribe(
       data => {
					console.log("Successfully updated page " + this.page._id);

					// Update the page list
					this.getAllJournals();
				
       },
       error => {
					console.log("Updating page title failed:  " + error._body);
       });
 	}

}

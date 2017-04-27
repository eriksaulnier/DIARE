import { Component, OnInit, Input } from '@angular/core';
import { PagesService, JournalsService, PopupService  } from '../../_services/index';
import { Page, Journal } from '../../_models/index';

@Component({
  selector: 'page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.css']
})
export class PageDisplayComponent implements OnInit {
  private currentJournal: Journal;
  private currentPage: Page;
  private editable: boolean;

  constructor(
	private pagesService: PagesService,
    private journalsService: JournalsService,
    private popupService: PopupService
  ) {

  	this.editable = false;

		// Subscribe to journal service messages
    this.journalsService.emitter.subscribe(
      message => { this.journalMessageRecieved(message) }
    )

    // Subscribe to page service messages
    this.pagesService.emitter.subscribe(
      message => { this.pageMessageRecieved(message) }
    )
  }


	// ---------------------------------------------------------------------------
  // Runs functions as soon as the page starts to load. but after the constructor
  ngOnInit() {

  }


	// ---------------------------------------------------------------------------
  // Returns true or false depending on if there is currently a page selected
  pageExists() {
    if (this.currentPage) {
      return true;
    } else {
      return false;
    }
  }


	// ---------------------------------------------------------------------------
	// Returns true or false depending on if there are bullets in the current page
  bulletsExist() {
    if (this.currentPage && this.currentPage.bullets && this.currentPage.bullets.length > 0) {
      return true;
    } else {
      return false;
    }
  }


	// ---------------------------------------------------------------------------
	// Toggles between editable and non-editable state of the page title
	toggleEditable(){
		this.editable = !this.editable;
	}


	// ---------------------------------------------------------------------------
  // Allows us to persist user's updated page title input
	onEnter(value: string){
		this.pagesService.update(this.currentJournal._id, this.currentPage._id, {"title": value})
			.subscribe(
				data => {
					console.log("Successfully updated page " + this.currentPage._id);

					// Update the current page data
					this.pagesService.updatePage();

					// Use the journals service to set refresh the journal list
					this.journalsService.getJournal(this.currentJournal._id)
						.subscribe(
							data => {
								console.log("Successfully set currentJournal to " + this.currentJournal._id);
							},
							error => {
								console.log("Setting currentJournal failed: " + error.body);
							})
	       },
        error => {
					console.log("Deleting page failed:  " + error._body);
        });

		// Toggles out of the editable state
		this.toggleEditable();
	}


	// ---------------------------------------------------------------------------
	// Spawns a popup and upon confirmation deletes this page
	confirmDeletePage() {
		this.popupService.createDialog(
			"Confirm Delete",
			"Are you sure you want to delete <b>" + this.currentPage.title + "</b>?",
			"Cancel",
			"Yes, delete the page",
			this.deletePage.bind(this)
		);
	}


	// ---------------------------------------------------------------------------
	// Deletes this page
	deletePage() {
		// Delete this page through the pages service
    this.pagesService.delete(this.currentJournal._id, this.currentPage._id)
      .subscribe(
        data => {
					console.log("Successfully deleted page " + this.currentPage._id);

					// Update the current page data
					this.pagesService.updatePage();

					this.journalsService.getJournal(this.currentJournal._id)
						.subscribe(
							data => {
								console.log("Successfully set currentJournal to " + this.currentJournal._id);
							},
							error => {
								console.log("Setting currentJournal failed: " + error.body);
							})
        },
        error => {
					console.log("Deleting page failed:  " + error._body);
        });
  }


	// ---------------------------------------------------------------------------
	// Handles recieving and routing messages from the journalsService
	private journalMessageRecieved(message: string) {
		switch (message) {
			// Called when the current journal is updated
			case 'updateJournal': {
				// Update local currentJournal object
				this.currentJournal = JSON.parse(localStorage.getItem('currentJournal'));

				// If this journal has more than 1 page set the current page to the first one
				this.pagesService.selectPage();

				break;
			}
		}
	}


	// ---------------------------------------------------------------------------
	// Handles recieving and routing messages from the pagessService
	private pageMessageRecieved(message: string) {
		switch (message) {
			// Called weh nthe current page is updated
			case 'updatePage': {
				// Update local currentJournal object
				this.currentPage = JSON.parse(localStorage.getItem('currentPage'));

				break;
			}
		}
	}
}

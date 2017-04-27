import { Component, OnInit, Input } from '@angular/core';
import { PagesService, JournalsService } from '../../_services/index';
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
    private journalsService: JournalsService
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
  // Some existence function for use outside component
  pageExists() {
    if (this.currentPage) {
      return true;
    } else {
      return false;
    }
  }

  bulletsExist() {
    if (this.currentPage && this.currentPage.bullets && this.currentPage.bullets.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  	// ---------------------------------------------------------------------------
  // message cases from services emissions

	private journalMessageRecieved(message: string) {
		switch (message) {
			case 'updateJournal': {
				// Update local currentJournal object
				this.currentJournal = JSON.parse(localStorage.getItem('currentJournal'));

				// If this journal has more than 1 page set the current page to the first one
				this.pagesService.selectPage();

				break;
			}
		}
	}

  private pageMessageRecieved(message: string) {
		switch (message) {
			case 'updatePage': {
				// Update local currentJournal object
				this.currentPage = JSON.parse(localStorage.getItem('currentPage'));

				break;
			}
		}
  }

  	// ---------------------------------------------------------------------------
  	// Need to be able to toggle between editing and non editing
	toggleEditable(){
		this.editable = !this.editable;
	}
	// ---------------------------------------------------------------------------
  	// allows us to persist user's updated page title input
	onEnter(value: string){	

		this.pagesService.update(this.currentJournal._id, this.currentPage._id, {"title": value})
		.subscribe(
			 data => {
					console.log("Successfully updated page " + this.currentPage._id);

					// Update the current page data
					this.pagesService.updatePage();

					this.journalsService.getJournal(this.currentJournal._id).subscribe(
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
	this.toggleEditable();
	}

	  // Deletes this page
	private deletePage() {
		// Delete this page through the pages service
				
    this.pagesService.delete(this.currentJournal._id, this.currentPage._id)
      .subscribe(
        data => {
				console.log("Successfully deleted page " + this.currentPage._id);

			// Update the current page data
				this.pagesService.updatePage();

				this.journalsService.getJournal(this.currentJournal._id).subscribe(
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

}

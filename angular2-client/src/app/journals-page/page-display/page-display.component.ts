import { Component, OnInit, Input } from '@angular/core';
import { PagesService, JournalsService } from '../../_services/index';
import { Page, Journal } from '../../_models/index';

@Component({
  selector: 'page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.css']
})
export class PageDisplayComponent implements OnInit {
  currentJournal: Journal;
	currentPage: Page;

  constructor(
		private pagesService: PagesService,
    private journalsService: JournalsService
  ) {

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

  loadPage() {
		// Make sure currentJournal exists and has pages
		if (this.currentJournal == null || this.currentJournal.pages.length < 1) {
			this.currentPage = null;
			return;
		}

		// Fetch page id from local storage
		let pageId = localStorage.getItem('currentPage');

		// If pageId is null clear current page and exit function
		if (pageId == null) {
			this.currentPage = null;
			return;
		}

		// Search for the pageId in the journal, if it exists set current page
		else {
			for (let i = 0; i < this.currentJournal.pages.length; i++) {
				let page = this.currentJournal.pages[i];

				// If id's match then set page
				if (page._id == pageId) {
					this.currentPage = page;
					console.log("Successfully set currentPage to " + pageId);
					return;
				}
			}
		}

		// If we make it this far then there is no current page
		this.currentPage = null;
  }

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
				this.currentJournal = JSON.parse(localStorage.getItem('currentJournal'));

				// Load the target page
				this.loadPage();

				break;
			}
		}
  }
}

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
				this.currentPage = JSON.parse(localStorage.getItem('currentPage'));

				break;
			}
		}
  }
}

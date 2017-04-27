import { Component, OnInit, Input } from '@angular/core';
import { PagesService } from '../../../_services/index';
import { Page } from '../../../_models/index';

@Component({
  selector: 'journal-pages',
  templateUrl: './journal-pages.component.html',
  styleUrls: ['./journal-pages.component.css']
})
export class JournalPagesComponent implements OnInit {
	@Input() pages: Page[];
	currentPage: Page;

  constructor(
		private pagesService: PagesService
	) {
		// Subscribe to page service messages
    this.pagesService.emitter.subscribe(
      message => { this.pageMessageRecieved(message) }
    )
	}

  ngOnInit() {
  }

	// ---------------------------------------------------------------------------
	// Handles messages emitted from the pagesService
	private pageMessageRecieved(message: string) {
		switch (message) {
			// Called when the current page is updated
			case 'updatePage': {
				// Update local currentJournal object
				this.currentPage = JSON.parse(localStorage.getItem('currentPage'));
				break;
			}
		}
	}
}

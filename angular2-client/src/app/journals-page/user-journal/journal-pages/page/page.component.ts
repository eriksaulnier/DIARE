import { Component, OnInit, Input } from '@angular/core';
import { PagesService} from '../../../../_services/index';
import {PagedisplayUserjournalService} from '../../../shared/pagedisplay-userjournal.service';

import { Page} from '../../../../_models/index';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
	@Input() page: Page;

  constructor(
		private pagesService: PagesService,
		private pagedisplayUserjournalService: PagedisplayUserjournalService
   
	) {

	}

  ngOnInit() {
  }

	selectPage(element, event) {
		let pageId = element.page._id;
		this.pagedisplayUserjournalService.updatePageDisplay(pageId);
		console.log('Load page ' + pageId);
	}
}

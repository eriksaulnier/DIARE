import { Component, OnInit, Input } from '@angular/core';
import { PagesService, JournalsService } from '../../../../_services/index';

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
		private journalsService: JournalsService
	) {

	}

  ngOnInit() {
  }

	selectPage(event) {
		this.pagesService.selectPage(this.page._id);
	}
}

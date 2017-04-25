import { Component, OnInit, Input } from '@angular/core';
import { PagesService } from '../../../../_services/index';

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
	) {

	}

  ngOnInit() {
  }

	selectPage(event) {
		this.pagesService.selectPage(this.page._id);
	}
}

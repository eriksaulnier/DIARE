import { Component, OnInit, Input } from '@angular/core';
import { PagesService, JournalsService} from '../../_services/index';
import { Journal } from '../../_models/index';

@Component({
  selector: 'page-toolbar',
  templateUrl: './page-toolbar.component.html',
  styleUrls: ['./page-toolbar.component.css']
})
export class PageToolbarComponent implements OnInit {

  constructor(
		private pagesService: PagesService
	) { }

  ngOnInit() {
  }

}

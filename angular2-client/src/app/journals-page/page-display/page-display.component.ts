import { Component, OnInit, Input } from '@angular/core';
import { PagesService} from '../../_services/index';
import { Page} from '../../_models/index';

@Component({
  selector: 'page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.css']
})
export class PageDisplayComponent implements OnInit {
	@Input() page: Page;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { AddPageComponent } from './add-page/add-page.component';
import { PagesService, JournalsService} from '../../_services/index';
import { Journal } from '../../_models/index';

@Component({
  selector: 'page-toolbar',
  templateUrl: './page-toolbar.component.html',
  styleUrls: ['./page-toolbar.component.css'],
   providers: [PagesService]
})
export class PageToolbarComponent implements OnInit {
	private pagesService: PagesService;

  constructor() { }

  ngOnInit() {
  }

}

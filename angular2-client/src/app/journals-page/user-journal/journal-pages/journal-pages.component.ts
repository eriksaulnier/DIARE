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

  constructor(
		private pagesService: PagesService
	) { }

  ngOnInit() {
  }
}

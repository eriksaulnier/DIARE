import { Component, OnInit } from '@angular/core';
import { Page } from '../../../_models/index';

@Component({
  selector: 'journal-pages',
  templateUrl: './journal-pages.component.html',
  styleUrls: ['./journal-pages.component.css'],
})
export class JournalPagesComponent implements OnInit {
	
	pages: Page[];

  constructor() { }

  ngOnInit() {
  }

}

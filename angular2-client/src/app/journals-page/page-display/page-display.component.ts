import { Component, OnInit, Input } from '@angular/core';
import { PagesService} from '../../_services/index';
import { Page} from '../../_models/index';

@Component({
  selector: 'page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.css']
})
export class PageDisplayComponent implements OnInit {
	currentJournal: any;
	recentPage: any;
	

  constructor() {
	  this.loadPage();
   }
// ---------------------------------------------------------------------------
  // Runs functions as soon as the page starts to load. but after the constructor
  ngOnInit() {
  	
  }

  loadPage(){

    this.currentJournal = JSON.parse(localStorage.getItem('currentJournal'));
    if(this.currentJournal.pages != null){
      this.recentPage = this.currentJournal.pages[0];
    }

  }

}

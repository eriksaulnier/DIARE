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

    if( this.currentJournal && this.currentJournal.pages && this.currentJournal.pages.length > 0){
      this.recentPage = this.currentJournal.pages[0];
    }
  }

  pageExists() {
    if (this.recentPage) {
      return true;
    }
    else {
      return false;
    }
  }

  bulletsExist() {
    if (this.recentPage && this.recentPage.bullets && this.recentPage.bullets.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }
}

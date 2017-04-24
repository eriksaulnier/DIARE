import { Component, OnInit, Input } from '@angular/core';
import { PagesService} from '../../_services/index';
import {PagedisplayUserjournalService} from '../shared/pagedisplay-userjournal.service';
import { Page} from '../../_models/index';


@Component({
  selector: 'page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.css']
})
export class PageDisplayComponent implements OnInit {
	
  currentJournal: any;
	recentPage: any;



  constructor(
    private pagedisplayUserjournalService: PagedisplayUserjournalService
    ) {


    // Subscribe to the sharedservice pagedisplayUserjournalService emitter so we can get global update
    // messages
    this.pagedisplayUserjournalService.emitter.subscribe(
      message => { this.messageRecieved(message) }
    )
   }
// ---------------------------------------------------------------------------
  // Runs functions as soon as the page starts to load. but after the constructor
  ngOnInit() {
     this.loadPage("");
  }

  loadPage(page_title: string){
     this.currentJournal = JSON.parse(localStorage.getItem('currentJournal'));
     //make sure currentJournal exists, and has pages with size > 1
    if( this.currentJournal && this.currentJournal.pages && this.currentJournal.pages.length > 0){
      //no specified page
      if(page_title == ""){
        this.recentPage = this.currentJournal.pages[0];
      }
      else {
        //We got a page to match, need to find it.
        for (var i = this.currentJournal.pages.length - 1; i >= 0; i--) {
          if(this.currentJournal.pages[i].title == page_title){
            this.recentPage = this.currentJournal.pages[i];
          }
                 
        }

      }
      
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

    // Handles recieving and routing messages from the journalsService

    messageRecieved(message: {}) {
      if(message["message"] == 'update'){
          console.log("recieved message update, calling loadPage");
          this.loadPage(message["target"]);
      }

    }
}

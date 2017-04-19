import { Component, OnInit, Input } from '@angular/core';
import { PagesService, JournalsService} from '../../../_services/index';
import { Journal } from '../../../_models/index';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  constructor(
  	private pagesService: PagesService,
  	private journalsService: JournalsService,

  ) { }

  ngOnInit() {
  }


  // ---------------------------------------------------------------------------
  // Adds page to the currentJournal
  addPage(PageTitleInput: HTMLInputElement){
    let currentJournal = JSON.parse(localStorage.getItem('currentJournal'));
    console.log(currentJournal);
  	// Make sure the title input value is not empty
		let value = PageTitleInput.value.replace(/\s+$/, '');
		if (value == '')
			return;

  	this.pagesService.create(currentJournal._id, value).subscribe(
  		data => {

  		// Reset title input field
					PageTitleInput.value = null;

  		},
  		 error => {
          console.log("Adding page failed:  " + error._body);
          console.log(currentJournal._id, + " " + value);
        });


    //update currentJournal
    this.journalsService.getJournal(currentJournal._id).subscribe(
      data => {
        console.log("(addpage) Successfully updated currentJournal " + currentJournal._id);
      },

      error => {
        console.log("Setting current Journal failed: " + error._body);

      }

    )
    

  }

}

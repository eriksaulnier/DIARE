import { Component, OnInit } from '@angular/core';
import { JournalsService } from '../_services/index';

@Component({
  selector: 'journals-page',
  templateUrl: './journals-page.component.html',
  styleUrls: ['./journals-page.component.css'],
  providers: [JournalsService]
})
export class JournalsPageComponent implements OnInit {
	journals: string[];

  constructor(
    private journalsService: JournalsService,
  ) { this.journals = ['Mindfulness', 'Work', 'CSGO']; }

  //Runs functions as soon as the page starts to load
  ngOnInit() {
    this.getJournals();
  }

  //Function to get all journals tied to a userid
  getJournals() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let userid = user._id;

    this.journalsService.getAllJournals(userid)
      .subscribe(
        data => {
          //data has successfully loaded into local storage, do whatever you want with it now, I'm just printing to console
					this.journals = [];
					let journals = JSON.parse(localStorage.getItem('userJournals'));
					for (var i = 0; i < journals.size(); i++) {
						let journal = journals[i];
						journals.append(journal);
					}
        },
        error => {
          console.log("Getting journals failed:  " + error._body);
        });
  }
}

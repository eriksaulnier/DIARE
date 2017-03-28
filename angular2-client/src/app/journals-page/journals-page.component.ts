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
  ) { }

  // Runs functions as soon as the page starts to load
  ngOnInit() {
		// Subscribe to the journalService emitter - currently just used for sending
		// update messages to the component when things are changed
		this.journalsService.emitter$.subscribe(
			message => {
				// console.log(message);
				if (message == 'update')
					this.fetchJournalList();
			}
		)

		// Get the current user's journals
    this.getJournals();
  }

	// ---------------------------------------------------------------------------
  // Gets all journals tied to a userid
  getJournals() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let userid = user._id;

    this.journalsService.getAllJournals(userid)
      .subscribe(
        data => {
					console.log(this.journals);
        },
        error => {
          console.log("Getting journals failed:  " + error._body);
        });
  }

	// ---------------------------------------------------------------------------
  // Updates our journals variable based on localstorage
	private fetchJournalList() {
		this.journals = JSON.parse(localStorage.getItem('userJournals'));
		// console.log('journal list updated');
	}
}

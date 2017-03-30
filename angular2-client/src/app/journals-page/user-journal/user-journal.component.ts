import { Component, OnInit, Input} from '@angular/core';
import { JournalsService } from '../../_services/index';
import { Journal } from '../../_models/index';

@Component({
  selector: 'user-journal',
  templateUrl: './user-journal.component.html',
  styleUrls: ['./user-journal.component.css']
})
export class UserJournalComponent implements OnInit {
	private userid: string;

	@Input() journal: Journal;

  constructor(
		private journalsService: JournalsService,
	) {
		// Fetch the current userid and update variable
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.userid = user._id;
	}

	// ---------------------------------------------------------------------------
  // Runs functions as soon as the page starts to load. but after the constructor
  ngOnInit() {

  }

	// ---------------------------------------------------------------------------
  // Deletes the current journal
	deleteJournal() {
		// First make sure the current user is the same one that owns this journal
		if (this.userid != this.journal.userID)
			return;

		// Tell the journalsService to select this journal
    this.journalsService.delete(this.journal._id)
      .subscribe(
        data => {
					console.log("Successfully deleted journal " + this.journal._id);
					this.getJournals();
        },
        error => {
					console.log("Deleting journal failed:  " + error._body);
        });
  }

	// ---------------------------------------------------------------------------
  // Gets all of the journals tied to a specified userID
  getJournals(userID: string = this.userid) {
    this.journalsService.getAllJournals(userID)
      .subscribe(
        data => {
					console.log("Successfully fetched journals for user " + userID);
        },
        error => {
          console.log("Getting journals failed:  " + error._body);
        });
  }
}

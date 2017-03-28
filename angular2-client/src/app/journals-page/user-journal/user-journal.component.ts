import { Component, OnInit, Input} from '@angular/core';
import { Journal } from '../../_models/index';
import { JournalsService } from '../../_services/index';

@Component({
  selector: 'user-journal',
  templateUrl: './user-journal.component.html',
  styleUrls: ['./user-journal.component.css']
})
export class UserJournalComponent implements OnInit {
	@Input() journal: Journal;
	public user = JSON.parse(localStorage.getItem('currentUser'));
  public userid = this.user._id;

  constructor(
		private journalsService: JournalsService,
	) { }

  ngOnInit() {

  }

	// ---------------------------------------------------------------------------
  // Deletes the specified journal if user id's match up
	deleteJournal() {
		// Make sure userID's match up
		if (this.userid != this.journal.userID)
			return;

		// Tell the service to delete the journal
    this.journalsService.delete(this.journal._id)
      .subscribe(
        data => {
					this.getJournals();
        },
        error => {
					console.log("Deleting journal failed:  " + error._body);
        });
  }

	// ---------------------------------------------------------------------------
  // Gets all journals tied to the current userid
	getJournals() {
    this.journalsService.getAllJournals(this.userid)
      .subscribe(
        data => {
          // output updated local storage
          console.log(JSON.parse(localStorage.getItem('userJournals')));
        },
        error => {
          console.log("Getting journals failed:  " + error._body);
        });
  }
}

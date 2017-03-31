import { Component, OnInit } from '@angular/core';
import { JournalsService } from '../../_services/index';

@Component({
  selector: 'add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css']
})
export class AddJournalComponent {
	private userid: string;

  constructor(
    private journalsService: JournalsService,
  ) {
		// Fetch the current userid and update variable
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.userid = user._id;
	}

  // ---------------------------------------------------------------------------
  // Adds journal to database, tied to user's id
  addJournal(titleInput: HTMLInputElement) {
		// Make sure the title input value is not empty
		let value = titleInput.value.replace(/\s+$/, '');
		if (value == '')
			return;

		// Tell the journalsService to create a new journal with the designated name
    this.journalsService.create(this.userid, value)
      .subscribe(
        data => {
					console.log("Successfully created new journal " + data.id);

					// Reset title input field
					titleInput.value = null;

          // update journals in local storage
          this.getJournals();
        },
        error => {
          console.log("Adding journal failed:  " + error._body);
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

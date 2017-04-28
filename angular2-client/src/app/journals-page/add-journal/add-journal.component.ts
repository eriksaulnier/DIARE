import { Component, OnInit } from '@angular/core';
import { JournalsService, PagesService } from '../../_services/index';

@Component({
  selector: 'add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css']
})
export class AddJournalComponent {
	private userid: string;

  constructor(
		private journalsService: JournalsService,
    private pagesService: PagesService,
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
					let journalId = data.id;

					console.log("Successfully created new journal " + journalId);

					// Reset title input field
					titleInput.value = null;

					// update journals in local storage
					this.getJournals();

					// Create blank page by default
					this.pagesService.create(journalId, "New Page")
						.subscribe(
							data => {
								console.log("Successfully added new page to " + journalId);

								// Fetch the journal we just created
								this.journalsService.getJournal(journalId)
								.subscribe(
									data => {
									},
									error => {
										console.log("Failed fetching journal:  " + error._body);
									});
							},
							error => {
								console.log("Adding page to journal failed:  " + error._body);
							});
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

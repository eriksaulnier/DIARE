import { Component, OnInit, Input} from '@angular/core';
import { JournalsService, PagesService, PopupService } from '../../_services/index';
import { Journal } from '../../_models/index';

@Component({
  selector: 'user-journal',
  templateUrl: './user-journal.component.html',
  styleUrls: ['./user-journal.component.css']
})
export class UserJournalComponent implements OnInit {
	private userid: string;
	public showPages: boolean;
	@Input() journal: Journal;

  constructor(
		private journalsService: JournalsService,
		private pagesService: PagesService,
		private popupService: PopupService
	) {
		// Fetch the current userid and store in local storage
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.userid = user._id;

		// Set pages to hidden by default
		this.showPages = false;

		// Subscribe to the journalService emitter so we can get global update messages
		this.journalsService.emitter.subscribe(
			message => { this.journalMessageRecieved(message) }
		)
	}

	// ---------------------------------------------------------------------------
  // Runs functions as soon as the page starts to load. but after the constructor
  ngOnInit() {

  }

	// ---------------------------------------------------------------------------
	// Spawns a popup and upon confirmation deletes this journal
	confirmDeleteJournal() {
		this.popupService.createDialog(
			"Confirm Delete",
			"Are you sure you want to delete <b>" + this.journal.title + "</b>?",
			"Cancel",
			"Yes, delete the journal",
			this.deleteJournal.bind(this)
		);
	}

	// ---------------------------------------------------------------------------
  // Deletes this journal
	private deleteJournal() {
		// Delete this journal through the journal service
    this.journalsService.delete(this.journal._id)
      .subscribe(
        data => {
					console.log("Successfully deleted journal " + this.journal._id);

					// Update the journal list
					this.getAllJournals();
        },
        error => {
					console.log("Deleting journal failed:  " + error._body);
        });
  }

	// ---------------------------------------------------------------------------
	// Spawns a popup for editing this journal title
  editJournalTitle() {
    this.popupService.createForm(
      "Edit Journal Title",
			"",
      "New Title",
      "Cancel",
      "Submit",
      this.updateTitle.bind(this)
    );
  }

	// ---------------------------------------------------------------------------
  // Update this journal's title
	private updateTitle(value: string) {
	  this.journalsService.updateJournal(this.journal._id, {title: value})
     .subscribe(
       data => {
					console.log("Successfully updated journal " + this.journal._id);

					// Update the journal list
					this.getAllJournals();
       },
       error => {
					console.log("Updating journal title failed:  " + error._body);
       });
 	}

	// ---------------------------------------------------------------------------
	// Spanws popup for entering the title for a new page
	createNewPage() {
		this.popupService.createForm(
      "Create New Page",
      "",
			"Page Name",
      "Cancel",
      "Add page to journal",
      this.addPage.bind(this)
    );
	}

	// ---------------------------------------------------------------------------
	// Adds a page with the given name to this journal
  private addPage(value: string) {
  		let cleanValue = value.replace(/\s+$/, '');
  		if (cleanValue == '')
  				return;

  		// Create new page
  		this.pagesService.create(this.journal._id, cleanValue)
  			.subscribe(
  				data => {
  					console.log("Successfully added new page to " + this.journal._id);

						// Update the journal list
  					this.selectJournal();
  				},
  				error => {
  					console.log("Adding page to journal failed:  " + error._body);
  				});
  	}

	// ---------------------------------------------------------------------------
  // Updates list of current journals on localstorage and tells views to update
  getAllJournals(userID: string = this.userid) {
    this.journalsService.getAllJournals(userID)
      .subscribe(
        data => {
					console.log("Successfully fetched journals for user " + userID);
        },
        error => {
          console.log("Getting journals failed:  " + error._body);
        });
  }

	// ---------------------------------------------------------------------------
  // Selects this journal as the current journal
	selectJournal(event = null) {
		// Prevents event from tiggering while clicking on dropdown
		if (event != null && (event.target.tagName === 'A' || event.target.tagName === 'I'))
			return;

		this.journalsService.getJournal(this.journal._id)
			.subscribe(
				data => {
					console.log("Successfully set currentJournal to " + this.journal._id);
				},
				error => {
					console.log("Setting currentJournal failed: " + error.body);
				})
	}

	// ---------------------------------------------------------------------------
	// Handles recieving and routing messages from the journalsService
	private journalMessageRecieved(message: string) {
		switch (message) {
			// Called when the current journal has been updated
			case 'updateJournal': {
				// Fetch the new current journal from storage
				let currentJournal = JSON.parse(localStorage.getItem('currentJournal'));
				if (currentJournal == null)
					break;

				// If this is the new current journal then update the journal object and
				// show pages, otherwise hide
				if (this.journal._id == currentJournal._id) {
					this.journal = currentJournal;
					this.showPages = true;
				} else {
					this.showPages = false;
				}
				break;
			}

		}
	}
}

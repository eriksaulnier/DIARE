import { Component, OnInit, Input} from '@angular/core';
import { JournalsService, PopupService, PagesService } from '../../_services/index';
import {PagedisplayUserjournalService} from '../shared/pagedisplay-userjournal.service';
import { Journal } from '../../_models/index';

@Component({
  selector: 'user-journal',
  templateUrl: './user-journal.component.html',
  styleUrls: ['./user-journal.component.css']
})
export class UserJournalComponent implements OnInit {
	private userid: string;
	public showPages: boolean = false;
	@Input() journal: Journal;


  constructor(
		private journalsService: JournalsService,
		private popupService:PopupService,
		private pagedisplayUserjournalService: PagedisplayUserjournalService,
		private pagesService: PagesService
	) {
		// Fetch the current userid and update variable
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.userid = user._id;

		// Subscribe to the journalService emitter so we can get global update
		// messages
		this.journalsService.emitter.subscribe(
			message => { this.messageRecieved(message) }
		)
	}

	// ---------------------------------------------------------------------------
  // Runs functions as soon as the page starts to load. but after the constructor
  ngOnInit() {
		let currentJournal = JSON.parse(localStorage.getItem('currentJournal'));

		// If this is the current journal then 'switch' to it to load pages
		if (currentJournal._id == this.journal._id) {
			this.journalsService.getJournal(this.journal._id)
				.subscribe(
					data => {
						console.log("Successfully fetched pages for " + this.journal._id);
						this.journal = JSON.parse(localStorage.getItem('currentJournal'));
						this.showPages = true;
					},
					error => {
						console.log("Setting current Journal failed: " + error._body);
					})
		}
  }

	// -----------------------------------------------------------------------------------------------------------------------------
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

	confirmDeleteJournal() {
		this.popupService.createDialog(
			"Confirm Delete",
			"Are you sure you want to delete <b>" + this.journal.title + "</b>?",
			"Cancel",
			"Yes, delete the journal",
			this.deleteJournal.bind(this)
		);
	}

	// -----------------------------------------------------------------------------------------------------------------------------
  // Update the journal title
	updateTitle(value: string) {
	  this.journalsService.updateJournal(this.journal._id, {title: value})
     .subscribe(
       data => {
					console.log("Successfully updated journal " + this.journal._id);
					this.getJournals();
       },
       error => {
					console.log("Updating journal title failed:  " + error._body);
       });
 	}

  //Edits the current journal title
  editJournalTitle(){
    this.popupService.createForm(
      "Enter New Title",
      "",
      "Cancel",
      "Submit",
      this.updateTitle.bind(this)
    );
  }


  addPage(value: string) {
  		let cleanValue = value.replace(/\s+$/, '');
  		if (cleanValue == '')
  				return;
  
  		// Create new page
  		this.pagesService.create(this.journal._id, cleanValue)
  			.subscribe(
  				data => {
  					console.log("Successfully added new page to " + this.journal._id);
  					this.getJournals();
  				},
  				error => {
  					console.log("Adding page to journal failed:  " + error._body);
  				});
  	}
  
  	createPagePopup() {
  		this.popupService.createForm(
        "Create New Page",
        "",
  			"Page Name",
        "Cancel",
        "Add page to journal",
        this.addPage.bind(this)
      );
  	}



	// -----------------------------------------------------------------------------------------------------------------------------
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

	// -----------------------------------------------------------------------------------------------------------------------------
  // Selects this journal as the current journal
	selectJournal(element, event) {
		let journalId = element.journal._id;

		// Prevents event from tiggering while clicking on dropdown
		if (event.target.tagName === 'A' || event.target.tagName === 'I')
			return;

		this.journalsService.getJournal(journalId)
			.subscribe(
				data => {
					console.log("Successfully set currentJournal to " + journalId);
					this.journal = JSON.parse(localStorage.getItem('currentJournal'));
					this.pagedisplayUserjournalService.updatePageDisplay("");
				},
				error => {
					console.log("Setting current Journal failed: " + error._body);
				})
	}

	// -----------------------------------------------------------------------------------------------------------------------------
	// Handles recieving and routing messages from the journalsService
	messageRecieved(message: string) {
		switch (message) {
			case 'updateJournal': {
				let currentJournal = JSON.parse(localStorage.getItem('currentJournal'));

				if (currentJournal != null && this.journal._id == currentJournal._id) {
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

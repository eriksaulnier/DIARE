import { Component, OnInit, trigger, state, style, animate, transition, Input } from '@angular/core';
import { JournalsService, PagesService, BulletsService, PopupService } from '../_services/index';
import { Journal } from '../_models/index';

@Component({
  selector: 'journals-page',
  templateUrl: './journals-page.component.html',
  styleUrls: ['./journals-page.component.css'],
  providers: [JournalsService, PagesService, BulletsService, PopupService],
	animations: [
		// Sidebar slide in-out animation
		trigger('slideInOut', [
			state('in', style({'margin-left': -280})),
			state('out', style({'margin-left': 0})),
			transition('in <=> out', animate('0.3s ease-out'))
		])
	]
})
export class JournalsPageComponent implements OnInit {
	private userid: string;
	public currentJournal: Journal;
	@Input() journals: Journal[];
	sidebar = {
		state: 'out',
		currentIcon: 'keyboard_arrow_left',
		icons: {
			in: 'keyboard_arrow_right',
			out: 'keyboard_arrow_left'
		}
	}

  constructor(
		private journalsService: JournalsService,
		private pagesService: PagesService,
		private bulletsService: BulletsService,
    private popupService: PopupService,
  ) {
		// Fetch the current userid and store in local storage
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.userid = user._id;

		// Subscribe to the journalService emitter so we can get global update messages
		this.journalsService.emitter.subscribe(
			message => { this.journalMessageRecieved(message) }
		)
	}

	// ---------------------------------------------------------------------------
  // Runs functions as soon as the page starts to load. but after the constructor
  ngOnInit() {
		// Fetch all of the user's journals; this will also handle setting the current journal
    this.getAllJournals();

		// Fetch the last modified journal
		this.getLastModified();
  }

	// ---------------------------------------------------------------------------
  // Gets all of the journals tied to a specified userID, if no id is specified
	// it will fetch the current user's journals by default.
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
  // Get the journal that was last modified by the user
  // it will fetch the current user's journals by default
  getLastModified(userID: string = this.userid) {
    this.journalsService.getLastModified(userID)
    .subscribe(
      data => {
        console.log("Successfully fetched last modified journal for user " + userID);
      },
      error => {
        console.log("Getting last modified journal failed:  " + error._body);
      });
  }

  //----------------------------------------------------------------------------
	// Toggles the sidebar visibility when the client is able to hide it
	// (sliding it in or out based on button click)
	toggleSidebarVisibility() {
		// Toggle the state between 'in' and 'out'
		this.sidebar.state = (this.sidebar.state === 'out') ? 'in' : 'out';

		// Update current button icon
		this.sidebar.currentIcon = this.sidebar.icons[this.sidebar.state];
	}

	// ---------------------------------------------------------------------------
	// Triggered on resize event from window, used for checking if sidebar should
	// be toggle-able or not
	onResize(event) {
		if (event.target.innerWidth > 768) {
			// Set sidebar back to to default state
			this.sidebar.state = 'out';
			this.sidebar.currentIcon = this.sidebar.icons['out'];
		}
	}

	// ---------------------------------------------------------------------------
	// Handles recieving and routing messages from the journalsService
	private journalMessageRecieved(message: string) {
		switch (message) {
			case 'updateList': {
				// Fetch journals from local storage
				this.journals = JSON.parse(localStorage.getItem('userJournals'));

				// Update currently selected journal
				this.getLastModified();

				break;
			}
			case 'updateJournal': {
				// Fetch current journal from local storage
				this.currentJournal = JSON.parse(localStorage.getItem('currentJournal'));

				break;
			}
		}
	}

  // ---------------------------------------------------------------------------
  currentJournalExists() {
    if (this.currentJournal) {
      return true;
    } else {
      return false;
    }
  }

  // ---------------------------------------------------------------------------
}

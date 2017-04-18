import { Component, OnInit, trigger, state, style, animate, transition, Input } from '@angular/core';
import { JournalsService, DialogService, FormService} from '../_services/index';
import { Journal } from '../_models/index';

@Component({
  selector: 'journals-page',
  templateUrl: './journals-page.component.html',
  styleUrls: ['./journals-page.component.css'],
  providers: [JournalsService, DialogService, FormService],
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
        private dialogService: DialogService,
        private formService: FormService

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
		// Fetch all of the user's journals
    this.getJournals();
  }

	// ---------------------------------------------------------------------------
  // Gets all of the journals tied to a specified userID, if no id is specified
	// it will fetch the current user's journals by default.
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

	// ---------------------------------------------------------------------------
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
	messageRecieved(message: string) {
		if (message == 'update')
			this.updateJournalList();
	}

	// ---------------------------------------------------------------------------
	// Updates the current list of journals based on local storage, called when we
	// get an update method from the journalsService
	private updateJournalList() {
		this.journals = JSON.parse(localStorage.getItem('userJournals'));
	}


	
}

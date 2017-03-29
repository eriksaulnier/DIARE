import { Component, OnInit, trigger, state, style, animate, transition } from '@angular/core';
import { JournalsService } from '../_services/index';

@Component({
  selector: 'journals-page',
  templateUrl: './journals-page.component.html',
  styleUrls: ['./journals-page.component.css'],
  providers: [JournalsService],
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
	journals: string[];
	sidebarState: string = 'out';
	sidebarToggleIcon: string = 'keyboard_arrow_left';

  constructor(
    private journalsService: JournalsService
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

	// Toggles the sidebar visiblity on mobile
	toggleSidebar() {
		this.sidebarState = (this.sidebarState === 'out') ? 'in' : 'out';
		this.sidebarToggleIcon = (this.sidebarState === 'out') ? 'keyboard_arrow_left' : 'keyboard_arrow_right';
	}

	// Window on resize event
	onResize(event) {
		// Change sidebar based on current window width
		if (event.target.innerWidth > 768) {
			this.sidebarState = 'out';
			this.sidebarToggleIcon = 'keyboard_arrow_left';
		}
	}
}

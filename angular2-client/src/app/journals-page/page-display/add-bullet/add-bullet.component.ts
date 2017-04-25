import { Component, OnInit } from '@angular/core';
import { BulletsService, PagesService } from '../../../_services/index';

@Component({
  selector: 'add-bullet',
  templateUrl: './add-bullet.component.html',
  styleUrls: ['./add-bullet.component.css']
})
export class AddBulletComponent implements OnInit {
	private userid: string;

  constructor(
		private pagesService: PagesService,
		private bulletsService: BulletsService
	) {
		// Fetch the current userid and update variable
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.userid = user._id;
	}

  ngOnInit() {
  }

	// ---------------------------------------------------------------------------
  // Adds bullet to database, tied to journal and user id
	// create(journalID: string, pageID: string, bulletText: string, bulletStarred: boolean) {
  addBullet(bulletText: HTMLInputElement, bulletType: HTMLInputElement, starred: HTMLInputElement) {
		let journal = JSON.parse(localStorage.getItem('currentJournal'));
		let currentPage = JSON.parse(localStorage.getItem('currentPage'));

		// Make sure the title input value is not empty
		let text = bulletText.value.replace(/\s+$/, '');
		if (text == '')
			return;

		// Create a new bullet using the bullets service
		this.bulletsService.create(journal._id, currentPage._id, text, bulletType.value, starred.checked)
			.subscribe(
				data => {
					console.log("Successfully added a new bullet to page " + currentPage._id);

					// Reset form
					bulletText.value = null;
					starred.checked = false;

					// Update the current page data
					this.pagesService.updatePage();
				},
				error => {
					console.log("Adding bullet failed:  " + error._body);
				});
  }
}

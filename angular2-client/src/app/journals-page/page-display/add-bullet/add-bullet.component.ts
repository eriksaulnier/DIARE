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
}

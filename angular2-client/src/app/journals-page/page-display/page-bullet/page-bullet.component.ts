import { Component, OnInit,  Input } from '@angular/core';
import { BulletsService } from '../../../_services/index';
import { Bullet } from '../../../_models/index';

@Component({
  selector: 'page-bullet',
  templateUrl: './page-bullet.component.html',
  styleUrls: ['./page-bullet.component.css']
})
export class PageBulletComponent implements OnInit {
  @Input() bullet: Bullet;
	symbol: string;

  constructor(
		private bulletsService: BulletsService
	) {}

  ngOnInit() {
		// Set's the current symbol based on the bullet type
		switch(this.bullet.type) {
			case 'event': {
				this.symbol = '&#9898;';
				break;
			}
			case 'task': {
				this.symbol = '&#9899;';
				break;
			}
			default:
			case 'note': {
				this.symbol = '&#9866;';
				break;
			}
		}
  }

	deleteBullet() {
		let journal = JSON.parse(localStorage.getItem('currentJournal'));
		let pageId = localStorage.getItem('currentPage');

		// Delete this journal through the journal service
    this.bulletsService.delete(journal._id, pageId, this.bullet._id)
      .subscribe(
        data => {
					console.log("Successfully deleted bullet " + this.bullet._id);
        },
        error => {
					console.log("Deleting bullet failed:  " + error._body);
        });
	}
}

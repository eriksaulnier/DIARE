import { Component, OnInit, Input } from '@angular/core';
import { BulletsService } from '../../_services/index';

@Component({
  selector: 'search-bullet',
  templateUrl: './search-bullet.component.html',
  styleUrls: ['./search-bullet.component.css']
})
export class SearchBulletComponent implements OnInit {
	@Input() bullet: any;
	editable: boolean;
	symbol: string;

	constructor(
		private bulletsService: BulletsService
	) { }

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
}

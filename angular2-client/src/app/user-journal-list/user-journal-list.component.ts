import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-journal-list',
  templateUrl: './user-journal-list.component.html',
  styleUrls: ['./user-journal-list.component.css']
})
export class UserJournalListComponent implements OnInit {
	journals: string[];

  constructor() {
  	this.journals = ['Mindfulness', 'Work', 'CSGO'];

  }

  ngOnInit() {
  }

}

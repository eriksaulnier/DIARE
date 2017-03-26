import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css']
})
export class AddJournalComponent implements OnInit {

  constructor() { }

  add_journal(title: HTMLInputElement): boolean {
  	console.log('Adding journal title: ${title.value}');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Adding user id: ${currentUser._id}');
  	return false;
  }

  ngOnInit() {
  }

}

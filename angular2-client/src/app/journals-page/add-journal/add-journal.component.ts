import { Component, OnInit } from '@angular/core';
import { JournalsService } from '../../_services/index';

@Component({
  selector: 'add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css'],
  providers: [JournalsService]
})
export class AddJournalComponent {

  constructor(
    private journalsService: JournalsService,
  ) { }

  addJournal(newTitle: string) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var userid = currentUser._id;

    this.journalsService.create(userid, newTitle)
      .subscribe(
        data => {
          console.log(data.message);
          console.log("ID of new journal:  " + data.id);
        },
        error => {
          console.log("Adding journal failed:  " + error._body);
        });
  }
}

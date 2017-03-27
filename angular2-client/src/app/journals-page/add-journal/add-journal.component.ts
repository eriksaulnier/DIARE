import { Component, OnInit } from '@angular/core';
import { JournalsService } from '../../_services/index';

@Component({
  selector: 'add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css'],
  providers: [JournalsService]
})
export class AddJournalComponent {
  public user = JSON.parse(localStorage.getItem('currentUser'));
  public userid = this.user._id;

  constructor(
    private journalsService: JournalsService,
  ) { }

  //------------------------------------------------------------------------------------------------------------------------------
  //Adds journal to database, tied to user's id

  addJournal(newTitle: string) {
    this.journalsService.create(this.userid, newTitle)
      .subscribe(
        data => {
          console.log(data.message);
          console.log("ID of new journal:  " + data.id);
          //update journals in local storage
          this.getJournals();
        },
        error => {
          console.log("Adding journal failed:  " + error._body);
        });
  }
  //------------------------------------------------------------------------------------------------------------------------------
  //Gets all journals tied to a userid

  getJournals() {
    this.journalsService.getAllJournals(this.userid)
      .subscribe(
        data => {
          //output updated local storage
          console.log(JSON.parse(localStorage.getItem('userJournals')));
        },
        error => {
          console.log("Getting journals failed:  " + error._body);
        });
  }
}

import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-user-journal',
  templateUrl: './user-journal.component.html',
  styleUrls: ['./user-journal.component.css']
})
export class UserJournalComponent implements OnInit {
	@Input() journal:string;// <-- added Input annotation

  constructor() { 
  
   }

  ngOnInit() {
  }

}

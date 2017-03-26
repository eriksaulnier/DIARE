import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'journals-page',
  templateUrl: './journals-page.component.html',
  styleUrls: ['./journals-page.component.css']
})
export class JournalsPageComponent implements OnInit {
	journals: string[];

  constructor() {
  	this.journals = ['Mindfulness', 'Work', 'CSGO'];
  }

  ngOnInit() {
  }

}

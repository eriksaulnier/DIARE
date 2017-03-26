import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.css']
})
export class JournalsComponent implements OnInit {
  //Get currentUser from local storage and turn it into a JSON object
  public userObject: any;


  ngOnInit(): void {
    this.userObject = JSON.parse(localStorage.getItem('currentUser'));
  }
}

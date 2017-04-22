import { Component, OnInit,  Input } from '@angular/core';

@Component({
  selector: 'page-bullet',
  templateUrl: './page-bullet.component.html',
  styleUrls: ['./page-bullet.component.css']
})
export class PageBulletComponent implements OnInit {

  @Input('bulletText') bulletText: string;

  constructor() { }

  ngOnInit() {
  }

}

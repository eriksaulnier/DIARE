import { Component, OnInit,  Input } from '@angular/core';
import { Bullet } from '../../../_models/index';

@Component({
  selector: 'page-bullet',
  templateUrl: './page-bullet.component.html',
  styleUrls: ['./page-bullet.component.css']
})
export class PageBulletComponent implements OnInit {
  @Input() bullet: Bullet;

  constructor() { }

  ngOnInit() {
		console.log(this.bullet);
  }

}

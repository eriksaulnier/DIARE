import { Component } from '@angular/core';

@Component({
  selector: 'about-page',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  isLoggedIn() {
    if (localStorage.getItem('currentUser'))
      return true;
    else
      return false;
  }
}

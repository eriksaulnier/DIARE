import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DIARE';

  userLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    else {
      return false;
    }
  }

  userLoggedOut() {
    if (!(localStorage.getItem('currentUser'))) {
      return true;
    }

    else {
      return false;
    }
  }
}

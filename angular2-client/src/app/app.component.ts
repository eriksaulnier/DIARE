import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DIARE';
  isIn = false;

  toggleState() {
      let bool = this.isIn;
      this.isIn = bool === false ? true : false;
  }

	isLoggedIn() {
		if (localStorage.getItem('currentUser'))
			return true;
		else
			return false;
	}

}

import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DIARE';
  isIn = false;
  //journalsActive = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
  //------------------------------------------------------------------------------------------------------------------------------
  journalsActive() {
    if (this.router.url === "/journals") {
      return true;
    }
    else {
      return false;
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------
  aboutActive() {
    if (this.router.url === "/about") {
      return true;
    }
    else {
      return false;
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------
  settingsActive() {
    if (this.router.url === "/settings") {
      return true;
    }
    else {
      return false;
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------
  homeActive() {
    if (this.router.url === "/home") {
      return true;
    }
    else {
      return false;
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------
  registerActive() {
    if (this.router.url === "/register") {
      return true;
    }
    else {
      return false;
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------
}

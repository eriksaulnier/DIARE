import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
  constructor(private http: Http, private config: AppConfig) { }

  //------------------------------------------------------------------------------------------------------------------------------
  //Logs user into website
  login(username: string, password: string) {
    return this.http.post(this.config.apiURL + '/users/authenticate', { username: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }
  //------------------------------------------------------------------------------------------------------------------------------
  //Logs user out of website
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  //------------------------------------------------------------------------------------------------------------------------------
  //Creates new user account
  create(user: User) {
    return this.http.post(this.config.apiURL + '/users/register', user, this.jwt());
  }
  //------------------------------------------------------------------------------------------------------------------------------
  //Creates request header with JWT token
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------
}

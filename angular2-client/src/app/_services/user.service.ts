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
  // Creates new user account
  // Returns success status on success or error message on failure

  create(user: User) {
    return this.http.post(this.config.apiURL + '/users/register', user, this.jwt())
      .map((response: Response) => {
        let user = response.json();

        // registration successful if there's a jwt token in the response
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Logs user into website
  // Will return an error or load a user object into currentUser local storage item

  login(username: string, password: string) {
    return this.http.post(this.config.apiURL + '/users/authenticate', { username: username, password: password })
      .map((response: Response) => {
        let user = response.json();
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Logs user out of website
  // Will not return anything

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Deletes user account with specified id
  // Will return either an error or {message: string talking about how deleting user was successful}

  delete(id: string) {
    return this.http.delete(this.config.apiURL + '/users/delete/'+ id, this.jwt())
      .map((response: Response) => {
        return response;
      });
  }
  //------------------------------------------------------------------------------------------------------------------------------
  //Creates request header with JWT token -- needed so that you can hit protected api routes

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}

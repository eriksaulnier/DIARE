import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { AppConfig } from '../../app.config';

@Injectable()
export class PagedisplayUserjournalService{
	private emitterSource: Subject<{}> = new Subject();
	emitter = this.emitterSource.asObservable();

  constructor(
		private http: Http,
		private config: AppConfig
	){}
  	

  updatePageDisplay(target){
 	let packet = {}
 	packet["message"] = "update";
 	if(target != ""){
 		packet["target"] = target;
 	}
 	else {
 		packet["target"] = ""
 	}
  	// emit update message
  	console.log("emitting package")
	this.emitterSource.next(packet);
  }



}

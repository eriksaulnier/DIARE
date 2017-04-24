import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class PopupService {
	private emitterSource = new Subject<any>();
	public emitter = this.emitterSource.asObservable();

	// ---------------------------------------------------------------------------
	// Sends new dialog info which tells our dialog to populate and toggle
	createDialog(title: string = '', text: string = '', cancelBtn: string = '', confirmBtn: string = '', callback: Function = null) {
		console.log('Creating dialog popup: ' + title);

		// emit dialog info
		this.emitterSource.next({
			title: title,
			text: text,
			cancelBtn: cancelBtn,
			confirmBtn: confirmBtn,
			callback: callback,
			isForm: false
		});
	}

	// ---------------------------------------------------------------------------
	createForm(title: string = '', text: string = '', label: string = '', cancelBtn: string = '', confirmBtn: string = '', callback: Function = null) {
		console.log('Creating form popup: ' + title);

		// emit dialog info
		this.emitterSource.next({
			title: title,
			text: text,
			label: label,
			cancelBtn: cancelBtn,
			confirmBtn: confirmBtn,
			callback: callback,
			isForm: true
		});
	}
}
